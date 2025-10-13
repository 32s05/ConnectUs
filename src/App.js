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
import Provider_EditProfile from "./pages/Provider_EditProfile";
import Provider_EditService from "./pages/Provider_EditService";
import ServiceRequests from "./pages/Provider_ServiceRequests";
import Customer_EditProfile from "./pages/Customer_EditProfile";



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
        <Route path="/services" element={<ServicePage />} />
        <Route path="/Customer_Edit-Profile" element={<Customer_EditProfile />} />

        {/* Provider Paths */}
        <Route path="/Provider_Dashboard" element={<ProviderDashboard />} />
        <Route path="/Provider_Edit-User-Profile" element={<Provider_EditProfile />} />
        <Route path="/Provider_Edit-Service" element={<Provider_EditService />} />
        <Route path="/Provider_Service-Requests" element={<ServiceRequests />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
