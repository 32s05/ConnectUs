import React, { useState } from "react";
import '../assets/style.css';

function Picture() {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload col-md-4 d-flex flex-column align-items-center">
      <label htmlFor="profilePic" className="upload-box d-flex justify-content-center align-items-center rounded-4 mt-4">
        {preview ? (<img src={preview} alt="Profile Preview" className="preview" />) : ("Upload Picture")}
      </label>
      <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="upload-input"/>

      {/* Register button */}
      <button type="submit" className="btn">Register</button>
    </div>
  );
}

export default Picture;
