import React, { useState } from "react";
import "../assets/style.css";

const ServicePageSection = () => {
  const categories = ["Tutoring", "Cleaning", "Catering", "Delivery", "Professional"];
  const [selectedCategory, setSelectedCategory] = useState("Tutoring");

  return (
    <div className="servicepage-section">
      {/* Sidebar */}
      <aside className="sidebar">
        <h4 className="sidebar-title">Categories</h4>
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
        <div className="service-profile">
          <div className="service-image"></div>

          <div className="service-info">
            <h2 className="service-name">[Service Name Here]</h2>
            <p className="service-meta">
              <em>{selectedCategory}</em> | <em>[Operating Hours]</em> | <em>[Rating]</em>
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
