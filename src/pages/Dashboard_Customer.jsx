import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import Navbar2 from '../components/Navbar2';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import DashboardSection from "../sections/Dashboard_Section";

const CustomerDashboard = () => {
    const [customer, setCustomer] = useState(null);

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
        <div className='body'>
            <Navbar2 />
            <div className="registeras-container">
                {customer ? (
                    <>
                        <h4 className="display-3 my-5 mx-5">
                            <span className="dash">Welcome </span><span className="customerNameDash">{customer.name ||'Your'}</span> <span className="sash">! </span>
                        </h4>
                        <DashboardSection customerData={customer} /> 
                    </>
                ) : (
                    <p>Loading dashboard...</p>
                )}
            </div>
        </div>
    );
};

// 16. Changed export name
export default CustomerDashboard;