import React, { useEffect, useState } from "react";
import "../assets/style.css";
import Navbar2 from "../components/Navbar2";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const CustomerMyBookings = () => {
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchCustomerBookings = async () => {
      try {
        const customerEmail = sessionStorage.getItem("loggedInUser");
        if (!customerEmail) return;

        // Find the logged-in customer document
        const customerRef = collection(db, "customers");
        const q = query(customerRef, where("email", "==", customerEmail));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const customerDoc = snapshot.docs[0];
          const customerData = customerDoc.data();
          const customerId = customerData.id || customerDoc.id;

          setCustomer(customerData);
          sessionStorage.setItem("customerData", JSON.stringify(customerData));

          // Fetch bookings associated with this customer
          const bookingRef = collection(db, "bookings");
          const bookingQuery = query(bookingRef, where("customerId", "==", customerId));
          const bookingSnapshot = await getDocs(bookingQuery);
          const bookingData = bookingSnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }));

          setBookings(bookingData);
        }
      } catch (error) {
        console.error("Error fetching customer or bookings:", error);
      }
    };

    fetchCustomerBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "cancelled" });
      setBookings((prev) =>
        prev.map((b) =>
          b.docId === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="body">
      <Navbar2 />
      <div className="my-bookings-container p-5">
        {customer ? (
          <h4 className="display-3 mb-5">
            <span className="serviceNameDash">My Bookings</span>
          </h4>
        ) : (
          <p></p>
        )}

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.docId} className="booking-card p-4 p-md-5 mb-4">
              <div className="user-image"></div>

              <div className="booking-info d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                  <h3 className="user-name">{booking.serviceName || "Unknown Provider"}</h3>
                  <p className="user-info">
                    {booking.date} at {booking.time}
                  </p>
                  <p className="booking-note">
                    <strong>Note:</strong> {booking.notes || "No notes provided" }
                  </p>
                  <p className="tier-info">Tier: {booking.tier}</p>
                </div>

                <div className="mt-3 mt-md-0 text-end">
                  <span
                    className={`badge ${
                      booking.status === "pending"
                        ? "bg-warning text-dark"
                        : booking.status === "approved"
                        ? "bg-success"
                        : booking.status === "cancelled"
                        ? "bg-danger"
                        : "bg-secondary"
                    } mb-2`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>

                  <div className="mb-3">
                    {booking.status === "pending" && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => cancelBooking(booking.docId)}
                      >
                        <i className="bi bi-x-circle"></i> Cancel Booking
                      </button>
                    )}
                  </div>

                  <Link to={`/ViewDetails/${booking.docId}`} className="view-btn mt-2">
                    View Details 
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerMyBookings;
