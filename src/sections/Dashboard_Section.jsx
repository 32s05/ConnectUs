import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import "../assets/style.css";

const Dashboard_Section = ({ searchTerm = "" }) => {
  const categories = ["Tutoring", "Cleaning", "Catering", "Delivery", "Professional"];
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tutoring");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, "providers");
        const snapshot = await getDocs(servicesRef);
        const servicesData = snapshot.docs.map((doc) => ({
          docuId: doc.id,
          ...doc.data(),
        }));
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services by category and search term
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      !searchTerm ||
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.service_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = service.category === selectedCategory;

    return searchTerm ? matchesSearch : matchesSearch && matchesCategory;
  });

  const activeCategories = searchTerm
    ? [...new Set(filteredServices.map(s => s.category))]
    : [selectedCategory];

  function to12Hour(time24) {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list ms-4">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`category-item ${activeCategories.includes(cat) ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <p>Loading services...</p>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            const displayHours = `${to12Hour(service.openingTime)} - ${to12Hour(service.closingTime)}`;
            return (
              <div
                className="service-card d-flex justify-content-between align-items-center p-5 my-4"
                key={service.docuId}
              >
                <div className="service-image">
                  <img
                    src={service.serviceProfileUrl}
                    alt="profile"
                    className="service-image"
                  />
                </div>
                <div className="service-info">
                  <h3 className="service-name">{service.service_name}</h3>
                  <p className="service-meta">
                    {service.category} | {displayHours} | {service.rating}
                  </p>
                  <p className="service-description">{service.description}</p>
                </div>
                <div>
                  <Link to={`/services/${service.docuId}`} className="view-more-btn">
                    View More
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No services available for this category.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard_Section;
