import React from "react";
import '../assets/style.css';
import Navbar2 from "../components/Navbar2";
import DashboardSection from "../sections/Dashboard_Section";


const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar2 />
      <DashboardSection /> 
    </div>
  );
};

export default Dashboard;