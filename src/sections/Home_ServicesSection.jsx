import React from "react";
import '../assets/style.css';

function ServicesSection() {
  return (
    <div className="container my-5">
        
        {/* Intro Text */}
        <div className="row introText">
            <div className="col-md-8 mx-auto text-center">
            <h2 className="display-4 intro-Header">Find the Services You Need</h2>
            <p className="text-muted mt-3 mb-5"><i>
                ConnectUs makes it easy to search and connect with trusted providers. 
                Everything that you need, you’ll find it here.  
            </i></p>
            </div>
        </div>

        {/* Search */}
        <div className="row mb-4">
            <div className="col-md-8 mx-auto">
            <div className="input-group shadow-sm searchBox-bg">
                <input type="text" className="form-control searchBox" placeholder="Explore your preferred services..." />
                <button className="btn"><span role="img" aria-label="search">🔍</span></button>
            </div>
            </div>
        </div>

        {/* Services */}
        <section className="services container text-center mt-5">
            <h5 className="text-muted mb-4">Frequently Picked Services</h5>
            <div className="service-list">
                <div className="service">Tutoring</div>
                <div className="service">Cleaning</div>
                <div className="service">Catering</div>
                <div className="service">Delivery</div>
                <div className="service">Professional</div>
            </div>
        </section>
    </div>
  );
}

export default ServicesSection;
