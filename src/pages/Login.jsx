import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../firebaseconfig";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import LoginBox from "../sections/Login_LoginBox";
import Logo from "../sections/Login_Logo";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // check if email exists in customer sheets
      const customerRef = collection(db, "customers");
      const qCustomer = query(customerRef, where("email", "==", email), where("password", "==", password));
      const customersSnapshot = await getDocs(qCustomer);

      if (!customersSnapshot.empty) {
        const dataCustomer = customersSnapshot.docs[0].data();
        sessionStorage.setItem("loggedInUser", email);
        localStorage.setItem("role", "customer");
        localStorage.setItem("customerId", dataCustomer.id);
        navigate("/Customer_Dashboard");
        return;
      } 
      
      // check if email exists in provider sheets
      const providerRef = collection(db, "providers");
      const qProvider = query(providerRef, where("email", "==", email), where("password", "==", password));
      const providersSnapshot = await getDocs(qProvider);

      if (!providersSnapshot.empty) {
        const dataProvider = providersSnapshot.docs[0].data();
        sessionStorage.setItem("loggedInUser", email);
        sessionStorage.setItem("role", "provider");
        localStorage.setItem("providerId", dataProvider.id);
        navigate("/Provider_Dashboard");
        return;
      } 

      setMessage("Invalid credentials.");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="body">
      <NavbarComponent />
        <div className="container py-0">
        <div className="row align-items-center justify-content-center g-0">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <Logo />
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <LoginBox 
            email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              message={message}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
