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

import 'bootstrap/dist/css/bootstrap.min.css';

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

        {/* Provider Paths */}
        <Route path="/Provider_Dashboard" element={<ProviderDashboard />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
