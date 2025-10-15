import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerRegistration from "./pages/Registration_Customer";
import ProviderRegistration from "./pages/Registration_Provider";
import RegisterAs from "./pages/RegisterAs";
import Dashboard from "./pages/Dashboard_Customer";  
import ProviderDashboard from "./pages/Dashboard_Provider";
import ServicePage from "./pages/ServicePage";
import ProviderEditProfile from "./pages/Provider_EditProfile";
import ProviderEditService from "./pages/Provider_EditService";
import ServiceRequests from "./pages/Provider_ServiceRequests";
import Bookings from "./pages/Provider_CompletedBookings";
import CustomerEditProfile from "./pages/Customer_EditProfile";
import CustomerMyBookings from "./pages/Customer_MyBookings";


import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CustomerRegistration" element={<CustomerRegistration />} />
        <Route path="/ProviderRegistration" element={<ProviderRegistration/>} />
        <Route path="/Registration" element={<RegisterAs />} />

        {/* Customer Paths */}
        <Route path="/Customer_Dashboard" element={<Dashboard />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/Customer_Edit-Profile" element={<CustomerEditProfile />} />
        <Route path="/Customer_My-Bookings" element={<CustomerMyBookings />} />
        

        {/* Provider Paths */}
        <Route path="/Provider_Dashboard" element={<ProviderDashboard />} />
        <Route path="/Provider_Edit-User-Profile" element={<ProviderEditProfile />} />
        <Route path="/Provider_Edit-Service" element={<ProviderEditService />} />
        <Route path="/Requests" element={<ServiceRequests />} />
        <Route path="/Bookings" element={<Bookings />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
