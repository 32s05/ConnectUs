import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";

const BookingPopup = ({ service, onClose }) => {
    const [selectedTier, setSelectedTier] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState("");

    if (!service) return null;
    const handleBook = async () => {
        if (!selectedTier || !name || !phone || !email || !date || !time) {
            alert("Please fill in all required fields!");
            return;
        }

        setLoading(true);

        try {
            const bookingsRef = collection(db, "bookings");
            await addDoc(bookingsRef, {
                bookingId: "BOOK" + Date.now(),
                providerId: service.id,
                serviceName: service.service_name,
                tier: selectedTier,
                name,
                phone,
                email,
                date,
                time,
                notes,
                status: "pending",
                createdAt: serverTimestamp(),
            });

                alert("Booking successful!");
                onClose();
            } catch (error) {
                console.error("Error saving booking:", error);
                alert("Failed to book service. Please try again.");
            }

            setLoading(false);
    };

    return (
        <div className="popup-overlay">
        <div className="popup-content">
            <h3>Book Service</h3>
            <p>Fill in your details to book this service.</p>
            
            <input type="text" placeholder="Your Name" value={name} className="form-control mb-2" onChange={(e) => setName(e.target.value)}/>
            <input type="tel" placeholder="Phone Number" value={phone} className="form-control mb-2" onChange={(e) => setPhone(e.target.value)} />
            <input type="email" placeholder="Email" value={email} className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} />        
            <input type="date" value={date} className="form-control mb-2" onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} className="form-control mb-2" onChange={(e) => setTime(e.target.value)}/>
            <select className="form-control mb-2" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                    <option value="">Select a tier</option>
                    {service.priceTiers.map((tier, index) => (
                        <option key={index} value={tier.tier}>
                            {tier.tier} | ₱{tier.price} — {tier.tierDesc}
                        </option>
                    ))}
            </select>
            <textarea placeholder="Notes" value={notes} className="form-control mb-2" onChange={(e) => setNotes(e.target.value)}/>

            <div className="d-flex justify-content-end gap-2 mt-2">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleBook} disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
            </div>
        </div>
        </div>
    );
};

export default BookingPopup;
