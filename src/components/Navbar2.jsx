import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoNav.png";
import "../assets/style.css";
import { FaUserCircle, FaPenSquare } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";

function Navbar2() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("customerData");
    navigate("/Login");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const main = document.querySelector(".body");
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (main) main.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      if (main) main.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      if (main) main.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerEmail = sessionStorage.getItem("loggedInUser");
        if (!customerEmail) return;

        const customerRef = collection(db, "customers");
        const q = query(customerRef, where("email", "==", customerEmail));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const customerData = snapshot.docs[0].data();
          setCustomer(customerData);
          sessionStorage.setItem("customerData", JSON.stringify(customerData));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar2 navbar navbar-expand-md d-flex align-items-center justify-content-between px-4 sticky-top">
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" width="50" height="50" className="me-2" />
          <span className="fw-bold fs-4 text-light">ConnectUs</span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaUserCircle className="profile-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end d-none d-md-flex">
          <div className="d-flex align-items-center">
            {/* Profile Icon/Picture */}
            {customer && customer.profileUrl ? (
              <img
                src={customer.profileUrl}
                alt="profile"
                className="profile-pic"
                onClick={toggleSidebar}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaUserCircle
                className="profile-icon"
                onClick={toggleSidebar}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`c-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="c-sidebar-header">
          {customer && (
            <>
              {customer && customer.picture !== "No picture uploaded" ? (
                <img
                  src={customer.picture}
                  alt="profile"
                  className="profile-pic"
                  onClick={toggleSidebar}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaUserCircle
                  className="profile-icon"
                  onClick={toggleSidebar}
                  style={{ cursor: "pointer" }}
                />
              )}

              <div className="c-sidebar-nameCon mt-3">
                <h5 className="c-sidebar-name mb-0">
                  {customer.name || "Customer Name"}
                </h5>
                <FaPenSquare
                  className="edit-icon"
                  onClick={() => navigate("/Customer_Edit-Profile")}
                  title="Edit Profile"
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="c-sidebar-nameCon">
                <p className="c-sidebar-detail mb-0">
                  {customer.email || "Email"}
                </p>
              </div>
            </>
          )}
        </div>

        <ul className="c-sidebar-menu mt-5">
          <li>
            <a href="/Customer_Dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/Customer_My-Bookings">My Bookings</a>
          </li>
          <li>
            <a href="/Customer_Edit-Profile">Edit Profile</a>
          </li>

          <hr className="mt-5" />
          <li>
            <button
              onClick={handleLogout}
              className="logout"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: "inherit",
                fontWeight: "inherit",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Navbar2;
