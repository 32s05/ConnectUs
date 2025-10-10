import React from "react";
import "../assets/style.css";
import Navbar2 from "../components/Navbar2";
import ServicePageSection from "../sections/ServicePage_Section";

const ServicePage = () => {
  return (
    <div className="servicepage-container">
      <Navbar2 />
      <ServicePageSection />
    </div>
  );
};

export default ServicePage;
