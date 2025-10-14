import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoNav.png";
import "../assets/style.css";
import { FaUserCircle, FaPenSquare } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";


function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [provider, setProvider] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("providerData");
        navigate("/Login");
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        const main = document.querySelector(".body"); // adjust selector if needed
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // <html>
            if (main) main.style.overflow = "hidden"; // your wrapper
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
        const fetchProviderData = async () => {
            try {
            const providerEmail = sessionStorage.getItem("loggedInUser");
            if (!providerEmail) return;

            const providerRef = collection(db, "providers");
            const q = query(providerRef, where("email", "==", providerEmail));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const providerData = snapshot.docs[0].data();
                setProvider(providerData);
                sessionStorage.setItem("providerData", JSON.stringify(providerData));
            }
            } catch (error) {
            console.error("Error fetching provider data:", error);
            }
        };

        fetchProviderData();

    }, []);

    return (
        <>
        {/* Navbar */}
        <nav className="navbar2 navbar navbar-expand-md d-flex align-items-center justify-content-between px-4 sticky-top">

            <div className="d-flex align-items-center">
            <img src={logo} alt="logo" width="50" height="50" className="me-2" />
            <span className="fw-bold fs-4 text-light">ConnectUs</span>
            </div>

            <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-label="Toggle sidebar">
                <FaUserCircle className="profile-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-end d-none d-md-flex">
                <div className="d-flex align-items-center">
                    <FaUserCircle className="profile-icon" onClick={toggleSidebar} style={{ cursor: "pointer" }}/>
                </div>
            </div>
        </nav>

        {/* Sidebar */}
        <div className={`p-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="p-sidebar-header">
            {provider && (
                <>
                <img
                    src={provider.serviceProfileUrl || "https://via.placeholder.com/80"}
                    alt="profile"
                    className="p-sidebar-profile-pic"
                />
                
                <div className="p-sidebar-nameCon mt-3"> 
                    <h5 className="p-sidebar-name mb-0">{provider.service_name || "Service"}    <FaPenSquare className="edit-icon" onClick={() => navigate("/Provider_Edit-Service")} title="Edit Profile" style={{ cursor: "pointer" }}/>
</h5>
                </div>
                
                <div className="p-sidebar-nameCon">
                    <p className="p-sidebar-service mb-0"> {provider.name || "Name"}</p>
                    <FaPenSquare className="edit-icon" onClick={() => navigate("/Provider_Edit-User-Profile")} title="Edit Profile" style={{ cursor: "pointer" }}/>
                </div>
                </>
            )}
            </div>

            <ul className="p-sidebar-menu mt-5">
            <li><a href="/Provider_Dashboard">Dashboard</a></li>
            <li><a href="/Requests">Booking Requests</a></li>
            <li><a href="/Bookings">Completed Bookings</a></li>
            <li><a href="/Provider_Edit-Service">Edit Service</a></li>
            <li><a href="/Provider_Edit-User-Profile">Edit User Profile</a></li>
            <hr className="mt-5" />
            <li><a onClick={handleLogout} className="logout">Log Out</a></li>
            </ul>
        </div>

        {/* Overlay */}
        {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}

export default Navbar;
