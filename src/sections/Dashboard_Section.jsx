import React from "react";

const Dashboard_Section = ({ selectedCategory }) => {
  const services = [
    {
      id: 1,
      name: "Tutoring Service",
      category: "Tutoring",
      hours: "9:00 AM - 6:00 PM",
      rating: "5.0",
      description: "Tutoring",
    },
  ];

  const filteredServices = services.filter(
    (service) => service.category === selectedCategory
  );

  return (
    <main className="main-content">
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.name} className="service-image" />
            <div className="service-info">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-meta">
                <em>{service.category}</em> | <em>{service.hours}</em> |{" "}
                <em>{service.rating}</em>
              </p>
              <p className="service-description">{service.description}</p>
              <button className="view-more-btn">View More</button>
            </div>
          </div>
        ))
      ) : (
        <p>No services available for this category.</p>
      )}
    </main>
  );
};

export default Dashboard_Section;
