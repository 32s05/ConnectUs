import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";

const BookingPopup = ({ service, onClose }) => {
    const [selectedTier, setSelectedTier] = useState("");
    const [customerData, setCustomerData] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");

    const customerId = localStorage.getItem("customerId");

    // fetch customer data: for name and email
    useEffect(() => {
        const fetchCustomerData = async () => {
          try {
            const q = query(collection(db, "customers"), where("id", "==", customerId));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
              const docSnap = querySnapshot.docs[0];
              const data = docSnap.data();
              setCustomerData({ ...data, docId: docSnap.id });
              setName(data.name || "");
              setEmail(data.email || "");
            } else {
              setMessage("Customer not found.");
            }
          } catch (error) {
            setMessage("Failed to load customer data.");
          }
        };
    
        fetchCustomerData();
      }, [customerId]);


    // booking function
    if (!service) return null;
    const handleBook = async () => {
        if (!selectedTier || !name || !phone || !email || !date || !time) {
            setMessage("Please fill in all required fields!");
            return;
        }

        // validate time range
        const selectedTime = time;
        const opening = service.openingTime;
        const closing = service.closingTime;

        if (selectedTime < opening || selectedTime > closing) {
            setMessage(`Please select a time between ${opening} and ${closing}.`);
            return;
        }

        setLoading(true);

        try {
            const selectedTierData = service.priceTiers.find(t => t.tier === selectedTier);

            const bookingsRef = collection(db, "bookings");
            await addDoc(bookingsRef, {
                bookingId: "BOOK" + Date.now(),
                providerId: service.id,
                customerId: customerId,
                serviceName: service.service_name,
                tier: selectedTier,
                tierPrice: selectedTierData ? selectedTierData.price : null,
                name,
                phone,
                email,
                date,
                time,
                notes,
                status: "pending",
                createdAt: serverTimestamp(),
                updateAt: serverTimestamp(),
            });

                alert("Booking successful!");
                onClose();
            } catch (error) {
                console.error("Error saving booking:", error);
                setMessage("Failed to book service. Please try again.");
            }

            setLoading(false);
    };

    return (
        <div className="popup-overlay">
        <div className="popup-content">
            <h3 className="fw-bold fs-4 fs-md-3">Book Service</h3>
            <small className="text-muted fst-italic fs-6 fs-md-5">Fill in your details to book this service.</small>

            {message && <div className="alert alert-info mt-3">{message}</div>}

            <div className="row mt-3">
                {/* Left */}
                <div className="col-md-5">
                    <div className="mb-3">
                        <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>Full Name:</label>
                        <input type="text" placeholder="Your Name" value={name} className="form-control" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>E-mail:</label>
                        <input type="email" placeholder="Email" value={email} className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>Phone Number:</label>
                        <input type="tel" placeholder="Phone Number" value={phone} className="form-control mb-2" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>

                {/* Divider */}
                <div className="col-md-1 d-none d-md-flex justify-content-center">
                    <div style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>
                </div>

                {/* Right */}
                <div className="col-md-6">
                    <div className="row g-2">
                        <div className="col-12 col-md-6 mb-3">
                            <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>Date:</label>
                            <input type="date" value={date} min={new Date().toISOString().split("T")[0]} className="form-control mb-2" onChange={(e) => setDate(e.target.value)} />            
                        </div>

                        <div className=" col-12 col-md-6 mb-3">
                            <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>Time:</label>
                            <input type="time" value={time} className="form-control mb-2" onChange={(e) => setTime(e.target.value)}/>          
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="mb-2 fs-6 fs-md-5"><span className="required">* </span>Price Tier:</label>
                        <select className="form-control mb-2" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                                <option value="">Select a tier</option>
                                {service.priceTiers.map((tier, index) => (
                                    <option key={index} value={tier.tier}>
                                        {tier.tier} | ₱{tier.price} — {tier.tierDesc}
                                    </option>
                                ))}
                        </select>            
                    </div>
                    
                    <textarea placeholder="Notes (optional)" value={notes} className="form-control mb-2" onChange={(e) => setNotes(e.target.value)}/>
                </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleBook} disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
            </div>
        </div>
        </div>
    );
};

export default BookingPopup;
