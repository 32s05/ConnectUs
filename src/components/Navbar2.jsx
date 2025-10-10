import React, { useEffect, useState } from "react";
import logo from "../assets/logoNav.png";
import "../assets/style.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar2() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/4luko9k4w8st5")
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="navbar2 d-flex align-items-center justify-content-between px-5">
      {/* Left: Logo + Text */}
      <div className="d-flex align-items-center">
        <img src={logo} alt="logo" width="50" height="50" className="me-2" />
        <span className="fw-bold fs-4 text-light">ConnectUs</span>
      </div>

      {/* Right: Search bar + Divider + Profile */}
      <div className="d-flex align-items-center">
        {/* Search Bar */}
        <div className="search-bar d-flex align-items-center px-3">
          <input
            type="text"
            placeholder=""
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Profile */}
        {user && user.picture && user.picture !== "No picture uploaded" ? (
          <img
            src={user.picture}
            alt="profile"
            className="profile-pic"
          />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}
      </div>
    </nav>
  );
}

export default Navbar2;
