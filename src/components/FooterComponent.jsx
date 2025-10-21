import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import '../assets/style.css'

function FooterComponent() {
  return (
    <footer className="footer text-center">
      {/* Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-0 border-bottom">
        <div>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      {/* Links */}
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem fa-5x me-0"></i> ConnectUs
              </h6>
              <p>
                ConnectUs is a trusted platform that brings together service providers and customers in one easy-to-use space. We make finding reliable help and offering your expertise simple, fast, and accessible — helping build stronger connections and smoother transactions for everyone.
              </p>
            </div>
            
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
              <p><i className="fas fa-home me-3"></i> Dasmariñas City, Cavite 4104</p>
              <p><i className="fas fa-envelope me-3"></i> connect.us@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i> +63 956 458 2156</p>
              <p><i className="fas fa-print me-3"></i> (046) 481-2390</p>
            </div>

          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        <p className="text-reset fw-bold">Angeles | Kim | BIT33</p>
        © 2025
      </div>
    </footer>
  );
}

export default FooterComponent;
