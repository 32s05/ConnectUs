import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/style.css';

function HeroComponent() {
  return (
    <section className="hero-section">
      <div className="container p-5">
        <div className="row align-items-center">
          
          <div className="col-md-8 mt-5">
            <h1 className="mt-3 mb-4 display-3 fw-bold">
                Connect with trusted services <br /> anytime, anywhere.
            </h1>
            <p className="lead mt-3">
                Discover, connect, and book the services you need. From home repairs to professional 
                help, we make it simple and reliable.
            </p>
            <p>
              Whether you're starting fresh, expanding your network, or just looking for 
              the right solution, ConnectUs brings services closer to you.
            </p>
            <div className="d-flex gap-3 mt-4 mb-5">
              <Link to="/Registration" className="btn btn-lg btnStart">Get Started<i className="bi bi-arrow-right ms-2"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroComponent;
