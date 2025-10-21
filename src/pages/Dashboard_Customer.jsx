import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import Navbar2 from '../components/Navbar2';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import DashboardSection from "../sections/Dashboard_Section";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added search state
  const [allServices, setAllServices] = useState([]); // All services from DB
  const [filteredServices, setFilteredServices] = useState([]); // Filtered list

  // Fetch customer info
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

  // Fetch services (for searching)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, "providers");
        const snapshot = await getDocs(servicesRef);
        const servicesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllServices(servicesList);
        setFilteredServices(servicesList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Search logic
  useEffect(() => {
    const termToSearch = searchTerm.toLowerCase().trim();

    const filtered = allServices.filter((service) =>
      service.name?.toLowerCase().includes(termToSearch) ||
      service.service_name?.toLowerCase().includes(termToSearch)
    );
    setFilteredServices(filtered);
  }, [searchTerm, allServices]);

  return (
    <div className="body overflow-hidden">
      <Navbar2 />
      <div className="registeras-container">
        {customer ? (
          <>
            <h4 className="display-3 mt-5 mb-5 mx-5">
              <span className="sash">Welcome, </span>
              <span className="dash">{customer.name || 'Your'}</span>
              <span className="sash">!</span>
            </h4>

            {/* 🔍 Search Bar (added here) */}
            <div className="row mb-2 px-4 px-md-0">
              <div className="col-md-8 mx-auto">
                <div className="input-group shadow-sm searchBox-bg">
                  <input
                    type="text"
                    className="form-control searchBox"
                    placeholder="Explore your preferred services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn">
                    <span role="img" aria-label="search">🔍</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Keep your existing dashboard layout */}
            <DashboardSection
              searchTerm={searchTerm}
              customerData={customer}
              filteredServices={filteredServices}
              
            />
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
