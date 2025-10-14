import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import NavbarComponent from "../components/Navbar_Provider";
import { useNavigate } from "react-router-dom";

const EditService = () => {
  const navigate = useNavigate();
  const providerId = localStorage.getItem("providerId");
  const [serviceData, setServiceData] = useState(null);
  const [servicePhoto, setServicePhoto] = useState(null);
  const [servicePreview, setServicePreview] = useState(null);
  const [message, setMessage] = useState("");

  const serviceNameRef = useRef();

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const q = query(collection(db, "providers"), where("id", "==", providerId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();

          // check if priceTiers exists
          if (!data.priceTiers) {
            data.priceTiers = [{ tier: "Default", price: 0 }];
          }
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

  if (!serviceData) return <p>Loading provider data...</p>;

  // service photo change
  const handleServiceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServicePhoto(file);
      setServicePreview(URL.createObjectURL(file));
    }
  };

  // information changes
  const handleChange = (field, value) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  // price tier edits
  const handleTierChange = (index, field, value) => {
    const newTiers = [...(serviceData.priceTiers || [])];
    if (field === "price") value = Number(value);
    newTiers[index][field] = value;
    setServiceData({ ...serviceData, priceTiers: newTiers });
  };

  // adding price tier
  const addTier = () => {
    const newTiers = [...(serviceData.priceTiers || [])];
    newTiers.push({ tier: "", price: 0 });
    setServiceData({ ...serviceData, priceTiers: newTiers });
  };

  // removing price tier
  const removeTier = (index) => {
    const newTiers = [...(serviceData.priceTiers || [])];
    newTiers.splice(index, 1);
    setServiceData({ ...serviceData, priceTiers: newTiers });
  };

  // saving updates
  const handleSave = async () => {
    try {
      // check if service name exists
      const qServiceName = query(
          collection(db, "providers"), 
          where("service_name", "==", serviceData.service_name)
        );
      const serviceSnapshot = await getDocs(qServiceName);

      const isDuplicate = serviceSnapshot.docs.some(
        docSnap => docSnap.id !== serviceData.docId
      );

      if (isDuplicate) {
        setMessage("Service Name is already registered.");
        serviceNameRef.current.focus();
        return;
      }

      // saving photo to cloud dinary
      let imageUrl = serviceData.imageUrl || "";

      if (servicePhoto) {
        const formData = new FormData();
        formData.append("file", servicePhoto);
        formData.append("upload_preset", "Provider_ServicePictures");

        const res = await fetch("https://api.cloudinary.com/v1_1/do04thsku/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const docRef = doc(db, "providers", serviceData.docId);

      const updatedData = {
        service_name: serviceData.service_name,
        category: serviceData.category,
        location: serviceData.location,
        description: serviceData.description,
        openingTime: serviceData.openingTime,
        closingTime: serviceData.closingTime,
        priceTiers: serviceData.priceTiers,
      };

      if (imageUrl) {
        updatedData.serviceProfileUrl = imageUrl;
      }

      await updateDoc(docRef, updatedData);

      setMessage("Service updated successfully!");
      setTimeout(() => navigate("/Provider_Dashboard"), 1500);
    } catch (error) {
      console.error("Error updating service:", error);
      setMessage("Failed to update service.");
    }
  };

  return (
    <div className="body">
      <NavbarComponent />
      <div className="container my-5">
        <h4 className="fw-bold display-5 mb-4">Edit Service Information</h4>
        
        <div className="d-flex justify-content-center mb-2 text-center">
            <label htmlFor="profilePhoto" className="upload3-box rounded-4 d-flex align-items-center justify-content-center">
              {servicePreview ? (
                <img src={servicePreview} alt="Profile Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : serviceData.serviceProfileUrl && serviceData.serviceProfileUrl !== "No picture uploaded" ? (
                <img src={serviceData.serviceProfileUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                "Upload Profile Photo"
              )}
            </label>
            <input type="file" id="servicePhoto" accept="image/*" onChange={handleServiceChange} className="upload-input"/>
        </div>
        <label className="form-label fw-bold mb-4 d-flex justify-content-center">Service Photo</label>

        {message && <div className="alert alert-info">{message}</div>}
        
        {/* Service Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">Service Name</label>
          <input ref={serviceNameRef} type="text" className="form-control" value={serviceData.service_name} onChange={(e) => handleChange("service_name", e.target.value)}/>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label fw-bold">Category</label>
          <select required className="form-control" value={serviceData.category} onChange={(e) => handleChange("category",e.target.value)}>
              <option value="Tutoring">Tutoring</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Catering">Catering</option>
              <option value="Delivery">Delivery</option>
              <option value="Professional">Professional</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label fw-bold">Location</label>
          <input type="text" className="form-control" value={serviceData.location} onChange={(e) => handleChange("location", e.target.value)}/>
        </div>

        {/* Operating Hours */}
        <div className="mb-3">
          <label className="form-label fw-bold">Operating Hours</label>
          <div className="d-flex gap-2">
              <input type="time" className="form-control" value={serviceData.openingTime} onChange={(e) => handleChange("openingTime", e.target.value)}/>
              <span>to</span>
              <input type="time" className="form-control" value={serviceData.closingTime} onChange={(e) => handleChange("closingTime", e.target.value)}/>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>
          <textarea className="form-control" value={serviceData.description} onChange={(e) => handleChange("description", e.target.value)}/>
        </div>

        {/* Price Tiers */}
        <div className="mb-3">
          <label className="form-label fw-bold">Price Tiers</label>
          {(serviceData.priceTiers || []).map((tier, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input type="text" placeholder="Tier Name" className="form-control me-2" value={tier.tier} onChange={(e) => handleTierChange(index, "tier", e.target.value)}/>
              <input type="number" placeholder="Price" className="form-control me-2" value={tier.price} onChange={(e) => handleTierChange(index, "price", e.target.value)}/>
              
              <button className="btn btn-danger" onClick={() => removeTier(index)}> - </button>
            </div>
          ))}
          
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success mt-3" onClick={addTier}> Add Price </button>
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

export default EditService;
