import React from "react";
import '../assets/style.css';

function Forms(){
    return(
        <div className="registration col-md-8">
            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" required />
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" required/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Address</label>
                <input type="email" className="form-control" placeholder="Enter your address" required/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" required/>
            </div>

            <div className="mb-3">
                <label className="form-label"><span className="text-danger">*</span> Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm your password" required/>
            </div>
        </div>
    );
}

export default Forms;