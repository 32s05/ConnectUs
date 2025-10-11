import React, { useState } from "react";
import '../assets/style.css';

function Picture({ setServiceProfileUrl, setUserProfileUrl }) {
  const [servicePreview, setServicePreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const cloudName = "do04thsku";
  const servicePreset = "Provider_ServicePictures";
  const profilePreset = "Provider_ProfilePictures";

  const uploadToCloudinary = async (file, setImageUrl, preset) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        console.log("Uploaded image:", data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    }
  };

  const handleServiceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServicePreview(URL.createObjectURL(file));
      uploadToCloudinary(file, setServiceProfileUrl, servicePreset);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      uploadToCloudinary(file, setUserProfileUrl, profilePreset);
    }
  };

  return (
    <div className="upload col-md-4 d-flex flex-column align-items-center">
        {/* Service Photo */}
        <div className="upload-box-container mb-4 text-center">
            <label htmlFor="servicePhoto" className="upload2-box rounded-4">
            {servicePreview ? (<img src={servicePreview} alt="Service Preview" className="preview" />) : ("Upload Service Photo")}
            </label>
            <input type="file" id="servicePhoto" accept="image/*" onChange={handleServiceChange} className="upload-input"/>
            <h6 className="mt-2 fw-medium">Service Photo</h6>
        </div>

        {/* Profile Photo */}
        <div className="upload-box-container text-center">
            <label htmlFor="profilePhoto" className="upload2-box rounded-4">
            {profilePreview ? (<img src={profilePreview} alt="Profile Preview" className="preview" />) : ("Upload Profile Photo")}
            </label>
            <input type="file" id="profilePhoto" accept="image/*" onChange={handleProfileChange} className="upload-input"/>
            <h6 className="mt-2 mb-5 fw-medium">Profile Photo</h6>
        </div>
    </div>
  );
}

export default Picture;
