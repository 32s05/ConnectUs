import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';

const Bookings = () => {
  const [provider, setProvider] = useState(null);
  
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
    <div className='body'> 
      <NavbarComponent />
      <div className="s-req-container p-5">
        {provider ? (
          <>
            <h4 className="display-3 mb-5">
              <span className="serviceNameDash">Completed Bookings</span>
            </h4>
          </>
        ) : (
          <p></p>
        )}

        <div className='booking-card p-4 p-md-5'>              
            <div className="service-image"></div> 
            
            <div className="booking-info d-flex justify-content-between align-items-center mt-4">
              <div>
                <h3 className="user-name">Juanito Doctor</h3>
                <p className="user-info">
                  contact information
                </p>
                <p className="booking-note">Loremasjdsjdasjdujeuhjshdjasdkjhsdf</p>
              </div>

              <Link to="/services" className="view-btn"> View Booking</Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Bookings;