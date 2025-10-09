import React from "react";
import "../assets/style.css";

function Forms() {
  return (
    <div className="form-grid one-column">
        <div className="form-left">
            {/* Service Provider Information */}
            <h2 className="mb-3 fw-bold">User Information</h2>
            <div className="form-group">
                <label>
                    <span className="required">*</span> Full Name
                </label>
                <input type="text" placeholder="Enter full name" required />
                </div>

                <div className="form-group">

                <div className="form-group">
                <label>
                    <span className="required">*</span> Email
                </label>
                <input type="email" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Password
                </label>
                <input type="password" placeholder="Enter password" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Confirm Password
                </label>
                <input type="password" placeholder="Confirm password" required />
                </div>

                <br></br>
                {/* Service Provider Business Information */}
                <h2 className="mb-3 fw-bold">Service Information</h2>
                <label>
                    <span className="required">*</span> Service Name
                </label>
                <input type="text" placeholder="Enter service name" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Service Category
                </label>
                <select required>
                    <option value="">Select a category</option>
                    <option>Tutoring</option>
                    <option>Cleaning</option>
                    <option>Catering</option>
                    <option>Delivery</option>
                    <option>Professional</option>
                </select>
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Location
                </label>
                <input type="text" placeholder="Enter location" required />
                </div>

                <div className="form-group">
                    <label><span className="required">*</span> Operating Hours</label>
                    <input type="text" placeholder="e.g. 9 AM - 6 PM" required />
                </div>

                <div className="form-group">
                    <label><span className="required">*</span> Description</label>
                    <textarea type="text" placeholder="Service Description" required /> 
                </div>
            </div>
    </div>
  );
}

export default Forms;
