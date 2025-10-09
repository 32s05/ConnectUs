import React from "react";
import '../assets/style.css';

function Forms({ name, setName, email, setEmail, address, setAddress, password, setPassword, confirmPassword, setConfirmPassword, message }){
    return(
        <div className="registration col-md-8">
            {message && <div className="alert alert-info mt-3">{message}</div>}

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Address</label>
                <input type="text" className="form-control" placeholder="Enter your address" required value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
        </div>
    );
}

export default Forms;