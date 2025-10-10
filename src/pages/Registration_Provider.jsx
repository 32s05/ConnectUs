import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
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
  const [operating_hours, setOperatingHours] = useState('');
  const [description, setDescription] = useState('');
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

  const sheetdbUrl = "https://sheetdb.io/api/v1/m70bz6ndrxxv4";
  const sheetCustomers = "https://sheetdb.io/api/v1/4luko9k4w8st5";

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

    if (!category || !location || !operating_hours || !description) {
      setServiceMessage("Please fill out all service information fields.");
      return;
    }

      
    if (!serviceProfileUrl) {
      setMessage("Please upload a service picture.");
      return;
    }
      

    try {
      //Check if email exists
      let checkResponse = await fetch(`${sheetdbUrl}/search?email=${encodeURIComponent(email)}`);
      const data1 = checkResponse.ok ? await checkResponse.json() : [];

      const res2 = await fetch(`${sheetCustomers}/search?email=${encodeURIComponent(email)}`);
      const data2 = res2.ok ? await res2.json() : [];

      if ((data1 && data1.length > 0) || (data2 && data2.length > 0)) {
        setMessage("Email already registered.");
        setEmail("");
        emailRef.current?.focus();
        return;
      }

      //Check if service name exists
      checkResponse = await fetch(`${sheetdbUrl}/search?service_name=${encodeURIComponent(service_name)}`);
      let serviceCheck = await checkResponse.json();

      if (serviceCheck.length > 0) {
        setServiceMessage("Service Name is already registered.");
        serviceNameRef.current.focus();
        return;
      }

      const newUser = {
        data: [
          {
            "name": name,
            "email": email,
            "password": password,
            "service_name": service_name,
            "category": category,
            "location": location,
            "operating_hours": operating_hours,
            "description": description,
            "userProfileUrl": userProfileUrl || "No picture uploaded",
            "serviceProfileUrl": serviceProfileUrl || "No picture uploaded",
          }
        ]
      };

      console.log("Sending to SheetDB:", JSON.stringify(newUser, null, 2));
      const addResponse = await fetch(sheetdbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (addResponse.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/Login"), 2000);
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
              operating_hours={operating_hours} setOperatingHours={setOperatingHours}
              description={description} setDescription={setDescription}

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
