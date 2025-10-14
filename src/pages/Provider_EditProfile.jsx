import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import NavbarComponent from "../components/Navbar_Provider";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const providerId = localStorage.getItem("providerId");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serviceData, setServiceData] = useState(null);
  const [password, setPassword] = useState("");  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");

  const passwordRef = useRef();

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const q = query(collection(db, "providers"), where("id", "==", providerId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          setServiceData({ ...data, docId: docSnap.id });
        } else {
          setMessage("Provider not found.");
        }
      } catch (error) {
        setMessage("Failed to load provider data.");
      }
    };

    fetchProviderData();
  }, [providerId]);

  useEffect(() => {
    if (serviceData) {
      setPassword(serviceData.password || "");
    }
  }, [serviceData]);

  if (!serviceData) return <p>Loading provider data...</p>;

  // profile photo change
  const handleServiceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // information changes
  const handleChange = (field, value) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  const changePass = async () => {
    if (!password) return;
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      passwordRef.current.focus();
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const docRef = doc(db, "providers", serviceData.docId);
      await updateDoc(docRef, { password });
      setMessage("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Failed to update password.");
    }
  };

  // saving updates
  const handleSave = async () => {
      try {
      // saving photo to cloud dinary
      let imageUrl = serviceData.userProfileUrl || "";

      if (profilePhoto) {
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "Provider_ProfilePictures");

        const res = await fetch("https://api.cloudinary.com/v1_1/do04thsku/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const docRef = doc(db, "providers", serviceData.docId);

      const updatedData = {
        name: serviceData.name,
        email: serviceData.email,
      };

      if (password) {
        updatedData.password = password;
      }

      if (imageUrl) {
        updatedData.userProfileUrl = imageUrl;
      }

      await updateDoc(docRef, updatedData);

      setSuccessMessage("Service updated successfully!");
      setTimeout(() => navigate("/Provider_Dashboard"), 1500);
    } catch (error) {
      console.log("Failed to update service.");
    }
  };

  return (
    <div className="body">
      <NavbarComponent />
      <div className="container my-5">
        <h4 className="fw-bold display-5 mb-4">Edit User Information</h4>
        
        <div className="d-flex justify-content-center mb-2 text-center">
            <label htmlFor="profilePhoto" className="upload3-box rounded-4 d-flex align-items-center justify-content-center">
              {profilePreview ? (
                  <img src={profilePreview} alt="Profile Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                ) : serviceData.userProfileUrl ? (
                  <img src={serviceData.userProfileUrl} alt="Profile Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                ) : (
                  "Upload Profile Photo"
                )}
            </label>
            <input type="file" id="profilePhoto" accept="image/*" onChange={(e) => console.log(e.target.files[0])} className="upload-input" style={{ display: "none" }} />
        </div>
        <label className="form-label fw-bold mb-4 d-flex justify-content-center">Profile Photo</label>
        
        {message && <div className="alert alert-info">{message}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="container my-5">
        <div className="row">
          {/* Left Column: User Details */}
          <div className="col-md-6">
            <h5 className="mb-4 fw-bold">User Details</h5>
            <div className="ms-3 mb-3">
              <label className="form-label fw-bold">Name</label>
              <input type="text" className="form-control" value={serviceData.name} onChange={(e) => {handleChange("name", e.target.value); setMessage("");}} />
            </div>
            <div className="ms-3 mb-3">
              <label className="form-label fw-bold">Email</label>
              <input type="text" className="form-control" disabled={true} value={serviceData.email} onChange={(e) => {handleChange("email", e.target.value); setMessage("");}} />
            </div>
          </div>

          {/* Divider */}
          <div className="col-md-1 d-none d-md-flex justify-content-center">
            <div style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>
          </div>

          {/* Right Column: Change Password */}
          <div className="col-md-5">
            <h5 className="mb-4 fw-bold">Change Password</h5>
            <div className="ms-3 mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value); setMessage("");}} />
            </div>
            <div className="ms-3 mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); setMessage("");}}/>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-success mt-3" onClick={changePass}> Change Password </button>
            </div>
          </div>
        </div>
      </div>

        {/* Save Button */}
        <div>
          <button className="register-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
