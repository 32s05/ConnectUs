import React, { useEffect }from "react";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import RegAs from "../sections/Reg_As";


const RegisterAs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="body">
        <NavbarComponent />
        <RegAs />
    </div>
  );
};

export default RegisterAs;

