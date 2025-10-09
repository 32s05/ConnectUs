import React, { useState } from "react";
import '../assets/style.css';

function Picture() {
    const [servicePreview, setServicePreview] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    const handleServiceChange = (e) => {
        const file = e.target.files[0];
        if (file) setServicePreview(URL.createObjectURL(file));
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePreview(URL.createObjectURL(file));
    };

    return (
        <div className="upload col-md-4 d-flex flex-column align-items-center">
            <div className="upload-row">
                <div className="upload-box-container">
                    <label htmlFor="servicePhoto" className="upload-box d-flex justify-content-center align-items-center rounded-4">
                        {servicePreview ? (<img src={servicePreview} alt="Service Preview" className="preview"/>) : ("Upload Service Photo")}
                    </label>
                    <input type="file" id="servicePhoto" accept="image/*" onChange={handleServiceChange} className="upload-input"/>
                </div>

                <div className="upload-box-container">
                    <label htmlFor="profilePhoto" className="upload-box d-flex mt-4 justify-content-center align-items-center rounded-4">
                        {profilePreview ? (<img src={profilePreview} alt="Profile Preview" className="preview"/>) : ("Upload Profile Photo")}
                    </label>
                    <input type="file" id="profilePhoto" accept="image/*" onChange={handleProfileChange} className="upload-input"/>
                </div>
            </div>

            <button type="submit" className="btn">Register</button>
        </div>
    );
}

export default Picture;
