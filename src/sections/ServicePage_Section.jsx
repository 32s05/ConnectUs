import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig"; 
import { Link, useParams } from "react-router-dom";
import BookingPopup from "../components/BookingPopup";
import "../assets/style.css";

const ServicePageSection = () => {
    const { id } = useParams();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
        try {
            const docRef = doc(db, "providers", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                setService(docSnap.data());
            }
            setLoading(false)
        } catch (error) {
            console.error("Error fetching services:", error);
            setLoading(false);
        }
        };

        fetchService();
    }, [id]);


    function to12Hour(time24) {
        if (!time24) return "";
        const [hours, minutes] = time24.split(":").map(Number);
        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }

    if (loading) return <p>Loading service details...</p>;
    if (!service) return <p>Service not found.</p>;

    return (
        <div className="dashboard-container p-5">

            <main className="slice-content">
                <div className="service-profile d-flex flex-md-row flex-column">
                    <div className="service-image">
                      <img src={service.serviceProfileUrl} alt="profile" className="service-image" />
                    </div>
                    <div className="service-info">
                        <h2 className="service-name mb-3 display-5 fw-bold">{service.service_name}</h2>
                        <p className="service-meta">
                            <em>{service.category}</em> | 
                            <em>{to12Hour(service.openingTime)} - {to12Hour(service.closingTime)}</em> | 
                            <em>[Rating]</em> 
                        </p>
                        <p className="service-contact mt-2">E-mail: {service.email}</p>
                        <p className="service-description mt-2">{service.description}</p>

                        <div>
                            <label className="price fw-bold mt-3 mb-3">Price Tiers</label>
                            <div className="ms-3">
                                {(service.priceTiers || []).map((tier, index) => (
                                    <div key={index} className="tier-card mb-3 p-3 rounded">
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <strong>{tier.tier}</strong>
                                        <span>₱ {tier.price.toFixed(2)}</span>
                                    </div>
                                    {tier.tierDesc && (
                                        <p className="mt-1 mb-0"><i>{tier.tierDesc}</i></p>
                                    )}
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        
                        <div className="d-flex justify-content-end mb-5">
                            <button className="book-btn" onClick={() => setShowPopup(true)}>Book now</button>
                            {showPopup && <BookingPopup service={service} onClose={() => setShowPopup(false)} />}
                        </div>

                    </div>
                </div>

                <div className="back-button-container mt-5">
                    <Link to="/Customer_Dashboard" className="back-link">
                        <button className="back-button">
                            &larr; Back to Dashboard
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default ServicePageSection;