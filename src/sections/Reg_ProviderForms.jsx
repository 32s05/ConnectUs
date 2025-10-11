import React from "react";
import "../assets/style.css";

function Forms({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    service_name, setServiceName, category, setCategory, location, setLocation, openingTime, setOpeningTime, closingTime, setClosingTime, 
    description, setDescription, message, serviceMessage, nameRef, emailRef, passwordRef, confirmPasswordRef, serviceNameRef
 }) {
  return (
    <div className="registration col-md-8">
        <div className="registration">
            {/* Service Provider Information */}
            <h2 className="mb-3 fw-bold">User Information</h2>

            {message && <p className="alert alert-info mt-3">{message}</p>}

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Full Name</label>
                <input ref={nameRef} type="text" placeholder="Enter full name" required value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            
            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Email</label>
                <input ref={emailRef} type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Password</label>
                <input ref={passwordRef} type="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Confirm Password</label>
                <input ref={confirmPasswordRef} type="password" placeholder="Confirm password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <br></br>

            {/* Service Provider Business Information */}
            <h2 className="mb-3 fw-bold">Service Information</h2>

            {serviceMessage && <p className="alert alert-info mt-3">{serviceMessage}</p>}

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Service Name</label>
                <input ref={serviceNameRef} type="text" placeholder="Enter service name" required value={service_name} onChange={(e) => setServiceName(e.target.value)}/>
            </div>

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Service Category</label>
                <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Catering">Catering</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Professional">Professional</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Location</label>
                <input type="text" placeholder="Enter location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div className="form-group">
                <label className="form-label">
                    <span className="required">*</span> Operating Hours
                </label>
                <div className="d-flex gap-2">
                    <input type="time" required value={openingTime} onChange={(e) => setOpeningTime(e.target.value)}/>
                    <span>to</span>
                    <input type="time" required value={closingTime} onChange={(e) => setClosingTime(e.target.value)}/>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label"><span className="required">*</span> Description</label>
                <textarea type="text" placeholder="Service Description" required value={description} onChange={(e) => setDescription(e.target.value)}/> 
            </div>
        </div>
    </div>
  );
}

export default Forms;
