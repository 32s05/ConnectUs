import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import '../assets/style.css';
import NavbarComponent from "../components/NavbarComponent";
import Forms from "../sections/Reg_Forms";
import Picture from "../sections/Reg_Picture";

const Registration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleForms = async (e) => {
    e.preventDefault();

    try {
      // check if email exists
      const customerRef = collection(db, "customers");
      const providerRef = collection(db, "providers");

      const qCustomers = query(customerRef, where("email", "==", email));
      const qProviders = query(providerRef, where("email", "==", email))
      
      const [customersSnapshot, providersSnapshot ] = await Promise.all([
        getDocs(qCustomers),
        getDocs(qProviders)
      ])
      
      if (!customersSnapshot.empty || !providersSnapshot.empty) {
        setMessage("Email already registered.");
        emailRef.current.focus();
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
      await addDoc(customerRef, {
            id: "CUST" + Date.now(),
            name: name,
            email: email,
            address: address,
            password: password,
            picture: imageUrl || "No picture uploaded",
      });

  
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/Login"), 2000);

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
