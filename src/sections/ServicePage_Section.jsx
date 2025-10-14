import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css";

const ServicePageSection = () => {
    const currentServiceCategory = "Tutoring";

    return (
        <div className="dashboard-container">

            <main className="slice-content">

                <div className="service-profile">
                    <div className="service-image"></div>
                    <div className="service-info">
                        <h2 className="service-name">[Service Name Here]</h2>
                        <p className="service-meta">
                            <em>{currentServiceCategory}</em> | <em>[Operating Hours]</em> | <em>[Rating]</em>
                        </p>
                        <p className="service-contact">[Contact Details]</p>
                        <p className="service-description">[Service Description Here]</p>
                        <button className="book-btn">Book now</button>
                    </div>
                </div>
                {/* Container for the back button */}
                <div className="back-button-container">
                    {/* The button uses the 'back-button' class for styling */}
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