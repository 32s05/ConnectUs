import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import Forms from "../sections/Reg_Forms";
import Picture from "../sections/Reg_Picture";

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sheetdbUrl = "https://sheetdb.io/api/v1/4luko9k4w8st5";

  const handleForms = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!imageUrl) {
      setMessage("Please upload a profile picture.");
      return;
    }


    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const checkResponse = await fetch(`${sheetdbUrl}/search?email=${email}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setMessage("Email already registered.");
        return;
      }

      const newUser = {
        data: [
          {
            name: name,
            email: email,
            address: address,
            password: password,
            picture: imageUrl || "No picture uploaded",
          }
        ]
      };

      const addResponse = await fetch(sheetdbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (addResponse.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="body">
      <NavbarComponent />
      <div className="container my-5">
        <h4 className="fw-bold display-5 mt-5 mb-4">Service-Seeker Registration</h4>
        <form onSubmit={handleForms}>
          <div className="row ms-1">
            <Picture setImageUrl={setImageUrl} />
            <Forms
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              address={address} setAddress={setAddress}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              message={message}
            />
          </div>
          
          <div className="text-center mt-4">
            <button type="submit" className="btn-Register">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
