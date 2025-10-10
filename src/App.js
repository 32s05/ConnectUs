import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerRegistration from "./pages/Registration_Customer";
import ProviderRegistration from "./pages/Registration_Provider";
import RegisterAs from "./pages/RegisterAs";
import Dashboard from "./pages/Dashboard";  
import ServicePage from "./pages/ServicePage";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<ServicePage />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
