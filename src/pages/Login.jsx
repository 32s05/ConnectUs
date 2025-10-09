import { useNavigate } from 'react-router-dom';
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import LoginBox from "../sections/Login_LoginBox";
import Logo from "../sections/Login_Logo";
import React, { useState, useEffect } from 'react';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sheetdbUrl = "https://sheetdb.io/api/v1/4luko9k4w8st5";

  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryUrl = `${sheetdbUrl}/search?email=${email}&password=${password}`;
    try {
      const response = await fetch(queryUrl);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        sessionStorage.setItem("loggedInUser", email);
        navigate("/Dashboard");
      } else {
        setMessage("Invalid credentials.");
      }
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
