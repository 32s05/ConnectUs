import React from "react";
import '../assets/style.css';
import logoNoBg from "../assets/ConnectUsnobg.png";

function Logo() {
  return (
    <div className="text-center">
      <img src={logoNoBg} alt="ConnectUs" className="img-fluid" />
    </div>
  );
}

export default Logo;
