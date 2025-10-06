import React from "react";
import logo from '../assets/logoNav.png';
import '../assets/style.css';
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand ms-5 d-flex align-items-center">
          <img src={logo} alt="logo" width="60" height="60" className="me-2" />
          <span className="fs-1 fw-bold">ConnectUs</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Registration">Register</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
