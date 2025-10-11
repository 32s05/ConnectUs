import React, { useState, useRef } from "react";
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

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const sheetdbUrl = "https://sheetdb.io/api/v1/4luko9k4w8st5";
  const sheetProviders = "https://sheetdb.io/api/v1/m70bz6ndrxxv4";

  const handleForms = async (e) => {
    e.preventDefault();

    try {
      // check if email exists
      let checkResponse = await fetch(`${sheetdbUrl}/search?email=${encodeURIComponent(email)}`);
      const data1 = checkResponse.ok ? await checkResponse.json() : [];

      const res2 = await fetch(`${sheetProviders}/search?email=${encodeURIComponent(email)}`);
      const data2 = res2.ok ? await res2.json() : [];

      if ((data1 && data1.length > 0) || (data2 && data2.length > 0)) {
        setMessage("Email already registered.");
        emailRef.current?.focus();
        return;
      }

      // input all fields validator
      if (!name) {
        setMessage("Please input your name.");
        nameRef.current.focus();
        return;
      }

      if (!email) {
        setMessage("Please input a valid email.");
        emailRef.current.focus();
        return;
      }

      if (!email.includes("@")) {
        setMessage("Please input a valid email.");
        setEmail("");
        emailRef.current.focus();
        return;
      }

      if (!address) {
        setMessage("Please input your address.");
        addressRef.current.focus();
        return;
      }

      // validate if password and confirm password match
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        passwordRef.current.focus();
        setPassword("");
        setConfirmPassword("");
        return;
      }

      // creating new user
      const newUser = {
        data: [
          {
            id: "CUST" + Date.now(),
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
        <h4 className="fw-bold display-5 mt-5 mb-5">Service-Seeker Registration</h4>
        <form onSubmit={handleForms} noValidate>
          <div className="row ms-1">
            <Picture setImageUrl={setImageUrl}/>
            <Forms
              name={name} setName={setName}
              email={email} setEmail= {setEmail}
              address={address} setAddress={setAddress}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              message={message}

              nameRef={nameRef}
              emailRef={emailRef}
              addressRef={addressRef}
              passwordRef={passwordRef}
              confirmPasswordRef={confirmPasswordRef}
            />
          </div>
          
          <div className="text-center mt-4">
            <button type="submit" className="register-btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
