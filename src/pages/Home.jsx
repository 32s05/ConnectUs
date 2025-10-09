import React from "react";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import HeroComponent from "../components/HeroComponent";
import DescriptionSection from "../sections/Home_DescriptionSection";
import ServicesSection from "../sections/Home_ServicesSection";
import CTASection from "../sections/Home_CTASection";

const Home = () => {
  return (
    <div className="body">
        <NavbarComponent />
        <HeroComponent />
        <DescriptionSection />
        <ServicesSection />
        <CTASection />
    </div>
  );
};

export default Home;
