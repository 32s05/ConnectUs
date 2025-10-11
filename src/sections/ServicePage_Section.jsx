import React from "react"; // Removed useState
import { Link } from "react-router-dom"; // 👈 Import Link
import "../assets/style.css";

const ServicePageSection = () => {
    const categories = ["Tutoring", "Cleaning", "Catering", "Delivery", "Professional"];
    const currentServiceCategory = "Tutoring"; 
    
    return (
        <div className="dashboard-container"> 
            
            {/* Sidebar - Links back to Dashboard */}
            <aside className="sidebar">
                <h4 className="sidebar-title">Categories</h4>
                <ul className="category-list">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`category-item ${currentServiceCategory === cat ? "active" : ""}`}
                        >
                            <Link 
                                to={`/dashboard?category=${cat}`} 
                                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                            >
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="main-content">
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
            </main>
        </div>
    );
};

export default ServicePageSection;