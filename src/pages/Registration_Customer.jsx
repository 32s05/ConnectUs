import React from "react";
import '../assets/style.css';
import Forms from "../sections/Reg_Forms";
import Picture from "../sections/Reg_Picture";

const Registration = () => {
  return (
    <div className="body">
      <div className="container my-5">
        <h4 className="fw-bold display-5 mt-5 mb-4">Service-Seeker Registration</h4>
        <form>
          <div className="row ms-5">
            <Forms />
            <Picture />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
