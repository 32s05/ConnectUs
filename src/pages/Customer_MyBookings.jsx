import React from 'react';
import '../assets/style.css'; 
import Navbar2 from '../components/Navbar2';


// Dummy data for services (kept for context)
const services = [
  {
    id: 1,
    name: 'Standard Plumbing Service',
    status: 'Completed',
    category: 'Home Repair',
    hours: '9am - 5pm',
    rating: '4.8',
    yourRate: '5.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    name: 'Deep Cleaning Package',
    status: 'Pending',
    category: 'Cleaning',
    hours: '8am - 12pm',
    rating: '4.5',
    yourRate: 'N/A',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    name: 'Electrical Wiring Inspection',
    status: 'Ongoing',
    category: 'Home Repair',
    hours: '1pm - 3pm',
    rating: '4.9',
    yourRate: 'N/A',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  // ... more services
];

// Utility function remains the same
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'status-completed'; // Blue
    case 'pending':
      return 'status-pending'; // Yellow
    case 'ongoing':
    case 'in progress':
      return 'status-ongoing'; // Green
    case 'cancelled':
      return 'status-cancelled'; // Red
    case 'not started':
    default:
      return 'status-not-started'; // Gray
  }
};

const CustomerMyBookings = () => {
  return (
    <div className='body'> 

    <Navbar2 />
    <div className="my-bookings-container">
      <h2 className="title">Recently Availed Services</h2>
      {services.map((service) => (
        // *** RENAMED CLASS HERE ***
        <div key={service.id} className="booking-item-card">
          <div className="card-header">
            <div className="avatar-placeholder">
              {/* This is the gray circle placeholder */}
            </div>
            <div className="service-details">
              <h3 className="service-name">{service.name}</h3>
              <div className="service-meta">
                <span className="meta-item">{`[${service.category}]`}</span> |
                <span className="meta-item">{`[Operating Hours: ${service.hours}]`}</span> |
                <span className="meta-item">{`[Rating: ${service.rating}]`}</span> |
                <span className="meta-item">{`[Your Rate: ${service.yourRate}]`}</span>
              </div>
            </div>
            <div className={`status-badge ${getStatusClass(service.status)}`}>
              Status: {service.status}
            </div>
          </div>
          <p className="service-description">{service.description}</p>
          <div className="book-again-container">
            {service.status === 'Completed' && (
              <button className="book-again-button">
                Book again
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CustomerMyBookings;