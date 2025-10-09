import React from "react";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import RegAs from "../sections/Reg_As";


const RegisterAs = () => {
  return (
    <div className="registeras-container">
        <NavbarComponent />
        <RegAs />
    </div>
  );
};

export default RegisterAs;

