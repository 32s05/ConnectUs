import React from "react";
import { Link } from "react-router-dom";
import '../assets/style.css';

function CTASection(){
    return(
        <section className="cta-section">
            <div className="container">
                <div className="row g-5">
                
                {/* Customers */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-lg border-0 rounded-4">
                        <div className="card-body p-5 text-center">
                        <h3 className="card-title fw-bold mb-3">
                            Find the <span className="service-CTA">right service</span> with ease
                        </h3>
                        <p className="card-text mb-4">
                            ConnectUs helps you quickly discover trusted providers. From tutoring 
                            to cleaning, delivery, and more — we make the process simple, fast, 
                            and reliable.
                        </p>
                        <Link to="/CustomerRegistration" className="btn btn-lg px-4">Register Now</Link>
                        </div>
                    </div>
                </div>


                {/* Service Providers */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-lg border-0 rounded-4">
                    <div className="card-body p-5 text-center">
                        <h3 className="card-title fw-bold mb-3">
                        Are you a <span className="service-CTA">Service Provider</span>?
                        </h3>
                        <p className="card-text mb-4">
                        Join ConnectUs today and reach more clients looking for your skills. 
                        Create your profile, showcase your expertise, and grow your business.
                        </p>
                        <Link to="/ProviderRegistration" className="btn btn-lg px-3">Get Started</Link>
                    </div>
                    </div>
                </div>

                </div>
            </div>
        </section>

    );
}

export default CTASection;