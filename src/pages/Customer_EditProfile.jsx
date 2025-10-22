import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import NavbarComponent from "../components/Navbar2"; // Use your customer navbar here
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const passwordRef = useRef();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const q = query(collection(db, "customers"), where("id", "==", customerId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          setCustomerData({ ...data, docId: docSnap.id });
        } else {
          setMessage("Customer not found.");
        }
      } catch (error) {
        setMessage("Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  useEffect(() => {
    if (customerData) {
      setPassword(customerData.password || "");
    }
  }, [customerData]);

  // handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // handle input field changes
  const handleChange = (field, value) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  // change password
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
      const docRef = doc(db, "customers", customerData.docId);
      await updateDoc(docRef, { password });
      setMessage("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Failed to update password.");
    }
  };

  // save updates
  const handleSave = async () => {
    try {
      let imageUrl = customerData.picture || "";

      // upload to Cloudinary if new photo chosen
      if (profilePhoto) {
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "Customer_ProfilePictures");

        const res = await fetch("https://api.cloudinary.com/v1_1/do04thsku/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const docRef = doc(db, "customers", customerData.docId);

      const updatedData = {
        name: customerData.name,
        address: customerData.address,
      };

      if (password) {
        updatedData.password = password;
      }

      if (imageUrl) {
        updatedData.picture = imageUrl;
      }

      await updateDoc(docRef, updatedData);

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => navigate("/Customer_Dashboard"), 1500);
    } catch (error) {
      console.log("Failed to update customer profile.");
    }
  };

  return (
    <div className="body">
      <NavbarComponent />
      <div className="container p-4 p-md-5">
        <h4 className="display-5 fw-bold mb-5">Edit Profile
        </h4>

        {loading ? (
          <p className="d-flex justify-content-center">Loading Profile Information...</p>
        ) : !customerData ? (
          <p>{message || "No customer data available."}</p>
        ) : (
          <>
            <div className="d-flex justify-content-center mb-2 text-center">
              <label htmlFor="profilePhoto" className="upload3-box rounded-4 d-flex align-items-center justify-content-center">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : customerData.picture && customerData.picture !== "No picture uploaded" ? (
                  <img src={customerData.picture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  "Upload Profile Photo"
                )}
              </label>
              <input type="file" id="profilePhoto" accept="image/*" onChange={handlePhotoChange} className="upload-input" />
            </div>
            <label className="form-label fw-bold mb-4 d-flex justify-content-center">Profile Photo</label>

            {message && <div className="alert alert-info">{message}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="container my-5">
              <div className="row">
                {/* User Details */}
                <div className="col-md-6">
                  <h5 className="mb-4 fw-bold">User Details</h5>
                  <div className="ms-3 mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customerData.name}
                      onChange={(e) => {
                        handleChange("name", e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                  <div className="ms-3 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={true}
                      value={customerData.email}
                      onChange={(e) => {
                        handleChange("email", e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                  <div className="ms-3 mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customerData.address}
                      onChange={(e) => {
                        handleChange("address", e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="col-md-1 d-none d-md-flex justify-content-center">
                  <div style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>
                </div>

                {/* Change Password */}
                <div className="col-md-5">
                  <h5 className="mb-4 fw-bold">Change Password</h5>
                  <div className="ms-3 mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                  <div className="ms-3 mb-3">
                    <label className="form-label fw-bold">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setMessage("");
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-success mt-3" onClick={changePass}>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Changes */}
            <div>
              <button className="register-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
