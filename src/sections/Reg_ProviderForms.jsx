import React from "react";
import "../assets/style.css";

function Forms() {
  return (
    <div className="form-grid one-column">
        <div className="form-left">
            <div className="form-group">
                <label>
                    <span className="required">*</span> Full Name
                </label>
                <input type="text" placeholder="Enter full name" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Service Name
                </label>
                <input type="text" placeholder="Enter service name" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Email
                </label>
                <input type="email" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                <label>
                    <span className="required">*</span> Service Category
                </label>
                <select required>
                    <option value="">Select a category</option>
                    <option>Cleaning</option>
                    <option>Repair</option>
                    <option>Beauty</option>
                    <option>Education</option>
                </select>
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
            </div>
    </div>
  );
}

export default Forms;
