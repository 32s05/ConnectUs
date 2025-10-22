import React, { useEffect }from "react";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import HeroComponent from "../components/HeroComponent";
import DescriptionSection from "../sections/Home_DescriptionSection";
import CTASection from "../sections/Home_CTASection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="body">
        <NavbarComponent />
        <HeroComponent />
        <div className="p-4">
          <DescriptionSection />
          <CTASection />
        </div>
        
    </div>
  );
};

export default Home;
