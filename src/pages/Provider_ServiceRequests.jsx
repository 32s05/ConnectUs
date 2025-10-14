import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ServiceReq = () => {
  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  
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
          const providerId = providerData.id || providerDoc.id; // your unique provider ID

          setProvider(providerData);
          sessionStorage.setItem("providerData", JSON.stringify(providerData));

          // Fetch bookings for this provider
          const bookingRef = collection(db, "bookings");
          const bookingQuery = query(bookingRef, where("providerId", "==", providerId));
          const bookingSnapshot = await getDocs(bookingQuery);
          const bookingData = bookingSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
          setBookings(bookingData);
        }
      } catch (error) {
        console.error("Error fetching provider or bookings:", error);
      }
    };

    fetchProviderData();
  }, []);


  const updateBookingStatus = async (bookingId, status) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status });
      setBookings(prev =>
        prev.map(b => (b.docId === bookingId ? { ...b, status } : b))
      );
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className='body'> 
      <NavbarComponent />
      <div className="s-req-container p-5">
        {provider ? (
          <>
            <h4 className="display-3 mb-5">
              <span className="serviceNameDash">{provider.service_name}</span> <span className="dash">Service Requests</span>
            </h4>
          </>
        ) : (
          <p></p>
        )}

        {bookings.length === 0 ? (
            <p>No booking requests yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.docId} className='booking-card p-4 p-md-5 mb-4'>              
                <div className="service-image"></div> 
                
                <div className="booking-info d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4">
                  <div>
                    <h3 className="user-name">{booking.name}</h3>
                    <p className="user-info">{booking.date} at {booking.time}</p>
                    <p className="booking-note">{booking.notes || "No notes provided"}</p>
                    <p className="tier-info">Tier: {booking.tier}</p>
                  </div>
                  
                  <div className="mt-3 mt-md-0 text-end">
                    <span className={`badge ${booking.status === "pending" ? "bg-warning text-dark" : booking.status === "approved" ? "bg-success" : "bg-danger"} mb-2`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <div className='mb-3'>
                      {booking.status === "pending" && (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => updateBookingStatus(booking.docId, "approved")}>
                            <i className="bi bi-check-circle"></i> Approve
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => updateBookingStatus(booking.docId, "rejected")}>
                            <i className="bi bi-x-circle"></i> Reject
                          </button>
                        </>
                      )}
                    </div>
                    <Link to="/services" className="view-btn mt-2">View Booking</Link>
                  </div>
                </div>
              </div>
            ))
          )}
                
      </div>
    </div>
);
};

export default ServiceReq;