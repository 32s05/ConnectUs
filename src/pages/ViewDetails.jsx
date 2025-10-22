import React, { useEffect, useState } from "react";
import "../assets/style.css";
import Navbar2 from "../components/Navbar2";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const ViewDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!id) return;
        const bookingRef = doc(db, "bookings", id);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          setBooking({ id: bookingSnap.id, ...bookingSnap.data() });
        } else {
          console.log("No booking found");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "not-started":
        return "bg-secondary";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-success";
    }
  };

  return (
    <div className="body">
      <Navbar2 />

      <div className="my-bookings-container p-5 mb-5">
          <h4 className="display-3 mb-5">
            <span className="serviceNameDash">Booking Details</span>
          </h4>

        {loading ? (
          <p className="d-flex justify-content-center">Loading booking details...</p>
        ) : (
          <>
          <div className="booking-details-card p-4 m-0 m-lg-4 mb-4 rounded shadow-sm bg-white">
            <p><strong>Booking ID:</strong> <b>{booking.bookingId}</b></p>
            <p><strong>Service Name:</strong> {booking.serviceName || "N/A"}</p>
            <p><strong>Provider ID:</strong> {booking.providerId || "N/A"}</p>
            <p><strong>Created At:</strong> {formatTimestamp(booking.createdAt)}</p>
            <p><strong>Date:</strong> {booking.date || "N/A"}</p>
            <p><strong>Time:</strong> {booking.time || "N/A"}</p>
            <p><strong>Tier:</strong> {booking.tier || "N/A"}</p>
            <p><strong>Tier Price:</strong> {booking.tierPrice ? `₱${booking.tierPrice}` : "N/A"}</p>
            
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                {booking.status
                  ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                  : "N/A"}
              </span>
            </p>

            <p><strong>Notes:</strong> {booking.notes || "No notes provided"}</p>
          </div>

          <div className="m-0 m-lg-4 d-flex flex-column flex-md-row gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              ← Back to My Bookings
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/Customer_Dashboard")}
            >
              Find More Services
            </button>
          </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
