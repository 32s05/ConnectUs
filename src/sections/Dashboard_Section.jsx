import React, { useState } from "react";
// 👈 Replace useNavigate with Link
import { Link } from "react-router-dom"; 
import "../assets/style.css";

const Dashboard_Section = () => {
  // Define all categories for the sidebar
  const categories = ["Tutoring", "Cleaning", "Catering", "Delivery", "Professional"];
  const [selectedCategory, setSelectedCategory] = useState("Tutoring"); 

  // Service data (only Tutoring Service Alpha remaining)
  const services = [
    {
      id: 1,
      name: "Tutoring Service Alpha",
      category: "Tutoring",
      hours: "9:00 AM - 6:00 PM",
      rating: "5.0",
      description: "Service Description Here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const filteredServices = services.filter(
    (service) => service.category === selectedCategory
  );

  return (
    <div className="dashboard-container"> 
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`category-item ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)} 
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div className="service-card" key={service.id}>
              
              <div className="service-image"></div> 
              
              <div className="service-info">
                <h3 className="service-name">[{service.name}]</h3>
                <p className="service-meta">
                  [{service.category}] | [{service.hours}] | [{service.rating}]
                </p>
                <p className="service-description">{service.description}</p>
                
                {/* 👈 Replaced the <button> with <Link> */}
                <Link 
                    to="/services" 
                    className="view-more-btn"
                >
                    View More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No services available for this category.</p> 
        )}
      </main>
    </div>
  );
};

export default Dashboard_Section;