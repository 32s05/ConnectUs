import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { FaUserCircle } from "react-icons/fa";
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';

const Bookings = () => {
  const [provider, setProvider] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const providerEmail = sessionStorage.getItem("loggedInUser");
        if (!providerEmail) return;

        const providerRef = collection(db, "providers");
        const q = query(providerRef, where("email", "==", providerEmail));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const providerDoc = snapshot.docs[0];
          const providerData = providerDoc.data();
          const providerId = providerData.id || providerDoc.id;

          setProvider(providerData);
          sessionStorage.setItem("providerData", JSON.stringify(providerData));

          // fetch bookings for this provider
          const bookingRef = collection(db, "bookings");
          const bookingQuery = query(bookingRef, where("providerId", "==", providerId));

          const bookingSnapshot = await getDocs(bookingQuery);

          const bookingData = await Promise.all(
            bookingSnapshot.docs.map(async (bookingDoc) => {
              const data = bookingDoc.data();
              const userId = data.customerId; 
              let picture = "";
              let userName = data.name || "";

              if (userId) {
                try {
                  const usersRef = collection(db, "customers");
                  const q = query(usersRef, where("id", "==", userId));
                  const querySnapshot = await getDocs(q);

                  if (!querySnapshot.empty) {
                    const userSnap = querySnapshot.docs[0];
                    picture = userSnap.data().picture || "";
                    userName = userSnap.data().name || userName;
                    console.log("Fetched customer:", userName, picture);
                  } else {
                    alert("No customer document found for ID:", userId);
                  }
                } catch (err) {
                  alert("Error fetching customer profile:", err);
                }
              }

              return { docId: bookingDoc.id, picture, name: userName, ...data };
            })
          );

          const filteredBookings = bookingData.filter(b => b.status === "completed");

          setBookings(filteredBookings);
        }
      } catch (error) {
        console.log("Error fetching provider or bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, []);

  return (
    <div className='body'> 
      <NavbarComponent />
      <div className="s-req-container p-5">
        <h4 className="display-3 mb-5">
          <span className="serviceNameDash">Completed Bookings</span>
        </h4>

        {loading ? (
          <p>Loading Completed Bookings..</p>
        ) : bookings.length === 0 ? (
          <p>No booking requests yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.docId} className='booking-card p-4 p-md-5 mb-4'>              
                <div>
                  <div className="user-image">
                    {booking.picture && booking.picture !== "No picture uploaded" ? (
                      <img src={booking.picture} alt={booking.name} className="user-image" />
                    ) : (
                      <FaUserCircle className="user-image" />
                    )}
                  </div>
                </div> 
                
                <div className="booking-info d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-center">
                  <div>
                    <h3 className="user-name">{booking.name}</h3>
                    <p className="user-info"><span className='fw-bold'>Schedule: </span>{booking.date} at {booking.time}</p>
                    <p className="booking-note">{booking.notes || "No notes provided"}</p>
                  </div>
                  
                  <div className="mt-0 mt-md-0 justify-content-center align-items-center">
                    <div className='mb-4'>
                      {booking.status === "completed" && (
                        <span className={`badge status-${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      )}
                    </div>
                    <Link to={`/ViewBookings/${booking.docId}`} className="view-btn">View Booking</Link>
                  </div>
                </div>
              </div>
            ))
        )}        
      </div>    
    </div>
  );
};

export default Bookings;