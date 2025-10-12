import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";

const ProviderDashboard = () => {
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
      <div className="registeras-container">
        {provider ? (
          <>
            <h4 className="display-3 my-5 mx-5">
              <span className="serviceNameDash">{provider.service_name}</span> <span className="dash">Dashboard</span>
            </h4>
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;