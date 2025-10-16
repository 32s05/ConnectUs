import React, { useEffect, useState } from "react";
import "../assets/style.css";
import Navbar2 from "../components/Navbar2";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const ViewDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
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
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (!booking) {
    return (
      <div className="body">
        <Navbar2 />
        <div className="text-center mt-5">
          <h3>Loading booking details...</h3>
        </div>
      </div>
    );
  }

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

  function to12Hour(time24) {
        if (!time24) return "";
        const [hours, minutes] = time24.split(":").map(Number);
        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }

  return (
    <div className="body">
      <Navbar2 />

      <div className="container mt-5 mb-5">
        <h2 className="mb-4">Booking Details</h2>

        <div className="booking-details-card p-4 rounded shadow-sm bg-white">
          <p><strong>Booking ID:</strong> <b>{booking.bookingId}</b></p>
          <p><strong>Customer ID:</strong> {booking.customerId || "N/A"}</p>
          <p><strong>Customer Name:</strong> {booking.name || "N/A"}</p>
          <p><strong>Phone Number:</strong> {booking.phone || "N/A"}</p>
          <p><strong>E-mail:</strong> {booking.email || "N/A"}</p>
          <p><strong>Booked at:</strong> {formatTimestamp(booking.createdAt)}</p>
          <p><strong>Schedule Date:</strong> {booking.date || "N/A"}</p>
          <p><strong>Schedule Time:</strong> {to12Hour(booking.time) || "N/A"}</p>
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

        <div className="mt-4 justify-content-end d-flex flex-column flex-md-row gap-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back to Bookings
          </button>

        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
