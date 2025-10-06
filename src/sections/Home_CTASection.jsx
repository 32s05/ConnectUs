import React from "react";
import { Link } from "react-router-dom";
import '../assets/style.css';

function CTASection(){
    return(
        <div className="registeras-content">
    <h2 className="registeras-title">What type of user are you registering as?</h2>

    <div className="registeras-buttons">
      <Link to="/CustomerRegistration" className="registeras-btn seeker">
        <span className="registeras-top">Service</span>
        <span className="registeras-bottom seeker-text">Seeker</span>
      </Link>

      <Link to="/ProviderRegistration" className="registeras-btn provider">
        <span className="registeras-top">Service</span>
        <span className="registeras-bottom provider-text">Provider</span>
      </Link>
    </div>
  </div>

    );
}

export default CTASection;