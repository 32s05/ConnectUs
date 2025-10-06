import React from "react";
import logo from "../assets/ConnectUsnobg.png";

function DescriptionSection() {
  return (
    <section className="description bg-connectus container my-5 py-1 mb-5">
      <div className="row align-items-center">
        
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img src={logo}  alt="ConnectUs Logo" className="img-fluid logo-large"/>
        </div>

        <div className="col-md-6">
          <p className="lead">
            <strong>ConnectUs</strong> is the premier platform designed to 
            effortlessly bridge the gap between service-seekers and service-providers. 
            Whether you're a professional looking to showcase your skills or a customer 
            in need of a service, ConnectUs provides an intuitive and accessible space 
            to connect.
          </p>
          <p>
            We believe in simplifying the search, streamlining communication, and fostering 
            a community where finding and offering services is made easy for all of <em>us</em>.
          </p>
        </div>

      </div>
    </section>
  );
}

export default DescriptionSection;
