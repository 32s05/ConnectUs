import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { FaUserCircle } from "react-icons/fa";
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ServiceReq = () => {
  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortedBookings = [...bookings].sort((a,b) => {
    const order = ["pending", "not-started", "completed", "cancelled"];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });
  
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
          const bookingQuery = query(bookingRef, where("providerId", "==", providerId), orderBy("createdAt", "asc"));
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
                    console.log("No customer document found for ID:", userId);
                  }
                } catch (err) {
                  console.error("Error fetching customer profile:", err);
                }
              }

              return { docId: bookingDoc.id, picture, name: userName, ...data };
            })
          );

          const filteredBookings = bookingData.filter(b => b.status !== "completed");

          setBookings(filteredBookings);
        }
      } catch (error) {
        console.error("Error fetching provider or bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, []);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status });

      if (status === "completed") {
        // remove completed bookings after 3 seconds
        setTimeout(() => {
          setBookings(prev => prev.filter(b => b.docId !== bookingId));
        }, 3000);
      } else {
        setBookings(prev =>
          prev.map(b => (b.docId === bookingId ? { ...b, status } : b))
        );
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className='body'> 
      <NavbarComponent />
      <div className="s-req-container p-5">
        <h4 className="display-3 mb-5">
          <span className="serviceNameDash">Booking Requests</span>
        </h4>

        {loading ?(
          <p>Loading Service Requests..</p>
        ) : sortedBookings.length === 0 ? (
          <p>No booking requests yet.</p>
          ) : (
            sortedBookings.map((booking) => (
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
                  
                  <div className="mt-3 mt-md-0 justify-content-center align-items-center">
                    <span className={`badge ${booking.status === "pending" ? "bg-warning text-dark" : booking.status === "approved" ? "bg-success" : booking.status === "not-started" ? "status-not-started": "bg-danger"} mb-2`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <div className='mb-4 '>
                      {booking.status === "pending" ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => updateBookingStatus(booking.docId, "not-started")}>
                            <i className="bi bi-check-circle"></i> Approve
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => updateBookingStatus(booking.docId, "cancelled")}>
                            <i className="bi bi-x-circle"></i> Cancel
                          </button>
                        </>
                      ): booking.status === "not-started" ? (
                        <>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => updateBookingStatus(booking.docId, "completed")}>
                              Mark as Completed
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => updateBookingStatus(booking.docId, "cancelled")}>
                              Cancel
                            </button>
                          </>
                        ) : null}
                    </div>
                      <div className=" text-md-end text-center mt-3">
                        <Link to={`/ViewBookings/${booking.docId}`} className="view-btn">View Booking</Link>
                      </div>
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