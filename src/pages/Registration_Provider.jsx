import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import "../assets/style.css";
import NavbarComponent from "../components/NavbarComponent";
import Forms from "../sections/Reg_ProviderForms";
import Picture from "../sections/Reg_ProviderPicture";

const ProviderRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [service_name, setServiceName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [description, setDescription] = useState('');
  const [priceTiers, setPriceTiers] = useState([]);
  const [userProfileUrl, setUserProfileUrl] = useState();
  const [serviceProfileUrl, setServiceProfileUrl] = useState();
  const [message, setMessage] = useState('');
  const [serviceMessage, setServiceMessage] = useState('');
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const serviceNameRef = useRef();

  const handleForms = async (e) => {
    e.preventDefault();

    // input all fields validator
    if (!name) {
    setMessage("Please enter your full name.");
    nameRef.current.focus();
    return;
    }

    if (!email) {
      setMessage("Please enter your email.");
      emailRef.current.focus();
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please input a valid email.");
      setEmail("");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      passwordRef.current.focus();
      return;
    }

    if (!confirmPassword) {
      setMessage("Please confirm your password.");
      confirmPasswordRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      passwordRef.current.focus();
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (!service_name) {
      setServiceMessage("Please enter your service name.");
      serviceNameRef.current.focus();
      return;
    }

    if (!category || !location || !openingTime || !closingTime || !description) {
      setServiceMessage("Please fill out all service information fields.");
      return;
    }

      
    if (!serviceProfileUrl) {
      setMessage("Please upload a service picture.");
      return;
    }
      

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

      // check if service name exists
      const qServiceName = query(providerRef, where("service_name", "==", service_name))

      const serviceSnapshot = await getDocs(qServiceName);
      
      if (!serviceSnapshot.empty) {
        setServiceMessage("Service Name is already registered.");
        serviceNameRef.current.focus();
        return;
      }

      await addDoc(providerRef, {
        id: "PROV" + Date.now(),
        name,
        email,
        password,
        service_name,
        category,
        location,
        openingTime,
        closingTime,
        description,
        priceTiers,
        userProfileUrl: userProfileUrl || "No picture uploaded",
        serviceProfileUrl: serviceProfileUrl || "No picture uploaded",
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
        <h4 className="fw-bold display-5 mt-5 mb-5">Service-Provider Registration</h4>
        <form onSubmit={ handleForms } noValidate>
          <div className="forms row ms-1">
            <Picture
              setServiceProfileUrl={setServiceProfileUrl}
              setUserProfileUrl={setUserProfileUrl}
            />
            <Forms
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}

              service_name={service_name} setServiceName={setServiceName}
              category={category} setCategory={setCategory}
              location={location} setLocation={setLocation}
              openingTime={openingTime} setOpeningTime={setOpeningTime}
              closingTime={closingTime} setClosingTime={setClosingTime}
              description={description} setDescription={setDescription}
              priceTiers={priceTiers} setPriceTiers={setPriceTiers}

              message={message} setMessage={setMessage}
              serviceMessage={serviceMessage} setServiceMessage={setServiceMessage}

              nameRef={nameRef}
              emailRef={emailRef}
              passwordRef={passwordRef}
              confirmPasswordRef={confirmPasswordRef}
              serviceNameRef={serviceNameRef}
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

export default ProviderRegistration;
