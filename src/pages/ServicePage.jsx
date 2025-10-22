import React, { useEffect } from "react";
import "../assets/style.css";
import Navbar2 from "../components/Navbar2";
import ServicePageSection from "../sections/ServicePage_Section";

const ServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="dashboard-page"> 
      <Navbar2 />
      <ServicePageSection />
    </div>
  );
};

export default ServicePage;