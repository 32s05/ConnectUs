import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style.css';
import NavbarComponent from '../components/Navbar_Provider';
import { collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart } from "recharts";

const ProviderDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [pending, setPending] = useState(0);
  const [request, setRequest] = useState(0);
  const [completed, setComplete] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const dateNow = new Date().toLocaleString();

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const userId = localStorage.getItem("providerId");
        if (!userId) return;

        const providerRef = collection(db, "providers");
        const q = query(providerRef, where("id", "==", userId));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const providerData = snapshot.docs[0].data();
          setProvider(providerData);
          sessionStorage.setItem("providerData", JSON.stringify(providerData));

          // fetch bookings for this provider
          const bookingRef = collection(db, "bookings");
          const bookingQuery = query(bookingRef, where("providerId", "==", userId));
          const bookingSnapshot = await getDocs(bookingQuery);

          let pendingCount = 0;
          let requestCount = 0;
          let completedCount = 0;
          let totalEarnings = 0;

          
          bookingSnapshot.forEach(doc => {
            const book = doc.data();
            const status = book.status;
            
            // get number of pendings (status with pending)
            if (status === "pending") pendingCount++;
            
            // get number of requests (status with not-started)
            else if (status === "not-started") requestCount++;

            // get number of completed (status with completed)
            else if (status === "completed") {
              completedCount++;
              totalEarnings += Number(book.tierPrice || 0);
            }
          });

          setPending(pendingCount);
          setRequest(requestCount);
          setComplete(completedCount);
          setEarnings(totalEarnings);
        }
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchProviderData();
    
  }, []);

  useEffect(() => {
  const fetchBookingsPerDay = async () => {
    const userId = localStorage.getItem("providerId");
    if (!userId) return;

    const bookingRef = collection(db, "bookings");
    const bookingQuery = query(bookingRef, where("providerId", "==", userId));
    const bookingSnapshot = await getDocs(bookingQuery);

    // Count bookings per day
    const countByDate = {};

    bookingSnapshot.docs.forEach(doc => {
      const booking = doc.data();
      if (booking.status === "completed" || booking.status === "not-started") {
        const date = booking.updateAt.toDate ? booking.updateAt.toDate() : new Date(booking.updateAt);
        const day = date.toLocaleDateString("en-CA"); 
        
        if (!countByDate[day]) countByDate[day] = 0;
        countByDate[day]++;
      }
    });

    // Convert object to array for Recharts
    const chartData = Object.keys(countByDate).map(day => ({
      day,
      bookings: countByDate[day]
    }));

    setWeeklyData(chartData);
  };

  fetchBookingsPerDay();
}, []);

  // chart service data
  const totalService =  [
    {name:"Pending", value: pending},
    {name:"Request", value: request},
    {name:"Completed", value: completed},
  ];

  const COLORS = ["#FFD700", "#f8961e", "#31487a"]; 

  return (
    <div className='body'> 
      <NavbarComponent />
      <div className="dashbProvider-container">
        {provider ? (
          <>
            <h4 className="display-3 mt-5 mb-3 mx-5">
              <span className="serviceNameDash">{provider.service_name}</span> <span className="dash">Dashboard</span>
            </h4>
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}

        {/* Services Tracker */}

        <div className="d-flex justify-content-center">
          <div className="totalServices-container p-5 m-5">
            <div className="row">
              {/* left, label */}
              <div className="col-md-3">
                <p className="serviceNameDash my-3 fw-bold display-5 text-md-start text-center">TOTAL SERVICES</p>
              </div>

              <div className="col-md-2 d-none d-md-flex justify-content-center">
                <div style={{ borderRight: "3px solid #d9e1f1", height: "100%" }}></div>
              </div>

              <div className="col-12 d-flex d-md-none justify-content-center mb-4 mt-2">
                <div style={{ borderBottom: "3px solid #d9e1f1", width: "100%" }}></div>
              </div>

              {/* right, number of pendings and completed */}
              <div className="col-md-7 align-items-center">
                <div className='row'>
                  <div className='col-md-4 d-flex flex-row flex-md-column justify-content-center align-items-center text-center'>
                    <p className='fw-bold display-3 me-2'>{pending}</p>
                    <Link to="/Requests" className='linkReq fs-2'>pendings</Link>
                  </div>
                  <div className='col-md-4 d-flex flex-row flex-md-column justify-content-center align-items-center text-center'>
                    <p className='fw-bold display-3 me-2'>{request}</p>
                    <Link to="/Requests" className='linkReq fs-2'>requests</Link>
                  </div>
                  <div className='col-md-4 d-flex  flex-row flex-md-column justify-content-center align-items-center text-center'>
                    <p className='fw-bold display-3 me-2'>{completed}</p>
                    <Link to="/Bookings" className='linkReq fs-2'>completed</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="serviceNameDash col-12 mt-1 text-center p-5">
          <p className='text-muted fs-5 fst-italic fw-bold mb-3'>As of {dateNow}</p>
          <p className="fw-bold display-3">Total Earnings: ₱ {earnings.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>

        {/* Charts */}
        <div className="chart-section mb-5 p-5">
          <div className="row">
              {/* Total Services */}
              <div className='col-md-6 text-center'>
                <label className='fw-bold fs-3'>Total Services Tracker</label>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart data={totalService}>
                    <Pie data={totalService} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {totalService.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className='col-md-6 mt-5 mt-md-0 text-center'>
                <label className='fw-bold fs-3 mb-3'>Daily Bookings Tracker</label>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart width={400} height={300} data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" fill="#31487a" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;