import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import NavbarComponent from '../components/Navbar2';

const ProviderDashboard = () => {
  const [provider, setProvider] = useState(null);
  const providerEmail = sessionStorage.getItem("loggedInUser");
  const sheetProviders = "https://sheetdb.io/api/v1/m70bz6ndrxxv4";

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const res = await fetch(`${sheetProviders}/search?email=${encodeURIComponent(providerEmail)}`);
        const data = await res.json();
        if (data.length > 0) {
          setProvider(data[0]);
        }
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    const savedProvider = sessionStorage.getItem("providerData");
    if (savedProvider) {
      setProvider(JSON.parse(savedProvider));
    } else {
      fetchProviderData();
    }
  }, [providerEmail]);

  return (
    <div className='body'> 
      <NavbarComponent />
      <div className="registeras-container">
        {provider ? (
          <>
            <h4 className="display-3 mb-5 my-5 mx-5">
              <span className='service-name'>{provider.service_name}</span> <span className='fw-bold'>Dashboard</span>
            </h4>
            <div className="underline" />
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;