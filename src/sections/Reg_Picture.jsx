import React, { useState } from "react";
import '../assets/style.css';

function Picture({ setImageUrl }) {
  // Integrating Cloudinary to store user profile pictures
  const cloudName = "do04thsku";
  const uploadPreset = "Customer_ProfilePictures";
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setPreview(URL.createObjectURL(file));
    
    // Uploading Pictures to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

     try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      console.log("Cloudinary response:", data);
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        console.log("Uploaded image:", data.secure_url);
      } else {
        console.error("Picture upload failed:", data);
      }
    } catch (error) {
      console.error("Picture upload error:", error);
    }
  };

  return (
    <div className="col-md-4 d-flex flex-column align-items-center">
      <label htmlFor="profilePic" className="upload-box d-flex justify-content-center align-items-center rounded-4 mt-4">
        {preview ? (<img src={preview} alt="Profile Preview" className="preview" />) : ("Upload Picture")}
      </label>
      <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="upload-input"/>

      <h6 className="mt-3 fw-medium mb-5">Profile Picture</h6>
    </div>
  );
}

export default Picture;
