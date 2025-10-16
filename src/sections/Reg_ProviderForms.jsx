import React from "react";
import "../assets/style.css";

function Forms({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    service_name, setServiceName, category, setCategory, location, setLocation, openingTime, setOpeningTime, closingTime, setClosingTime, 
    description, setDescription, message, serviceMessage, nameRef, emailRef, passwordRef, confirmPasswordRef, serviceNameRef, 
    priceTiers, setPriceTiers
 }) {

    // price tier edits
    const handleTierChange = (index, field, value) => {
        const newTiers = [...priceTiers];
        if (field === "price") value = Number(value);
        newTiers[index][field] = value;
        setPriceTiers(newTiers);
    };

    // adding price tier
    const addTier = () => {
        setPriceTiers([...priceTiers, {tier: "", price: 0, tierDesc: ""}]);
    };

     // removing price tier
    const removeTier = (index) => {
        const newTiers = [...priceTiers];
        newTiers.splice(index, 1);
        setPriceTiers(newTiers);
    };

    return (
        <div className="registration col-md-8">
            <div className="registration">
                {/* Service Provider Information */}
                <h2 className="mb-3 fw-bold">User Information</h2>

                {message && <p className="alert alert-info mt-3">{message}</p>}

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Full Name</label>
                    <input ref={nameRef} type="text" placeholder="Enter full name" required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                
                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Email</label>
                    <input ref={emailRef} type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Password</label>
                    <input ref={passwordRef} type="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Confirm Password</label>
                    <input ref={confirmPasswordRef} type="password" placeholder="Confirm password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                <br></br>

                {/* Service Provider Business Information */}
                <h2 className="mb-3 fw-bold">Service Information</h2>

                {serviceMessage && <p className="alert alert-info mt-3">{serviceMessage}</p>}

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Service Name</label>
                    <input ref={serviceNameRef} type="text" placeholder="Enter service name" required value={service_name} onChange={(e) => setServiceName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Service Category</label>
                    <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Catering">Catering</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Professional">Professional</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Location</label>
                    <input type="text" placeholder="Enter location" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="required">*</span> Operating Hours
                    </label>
                    <div className="d-flex gap-2">
                        <input type="time" required value={openingTime} onChange={(e) => setOpeningTime(e.target.value)}/>
                        <span>to</span>
                        <input type="time" required value={closingTime} onChange={(e) => setClosingTime(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label"><span className="required">*</span> Description</label>
                    <textarea type="text" placeholder="Service Description" required value={description} onChange={(e) => setDescription(e.target.value)}/> 
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Price Tiers</label>
                    {priceTiers.map((tier, index) => (
                        <div key={index} className="mb-3 p-2">
                        <div className="d-flex flex-column flex-md-row gap-2">
                            <input type="text" placeholder="Tier Name" className="form-control flex-grow-1" value={tier.tier} onChange={(e) => handleTierChange(index, "tier", e.target.value)}/>
                            <input type="number" placeholder="Price" className="form-control" value={tier.price} onChange={(e) => handleTierChange(index, "price", e.target.value)}/>
                        </div>
                        
                        <div className="mt-2">
                            <textarea placeholder="Tier Description" className="form-control" value={tier.tierDesc || ""} onChange={(e) => handleTierChange(index, "tierDesc", e.target.value)} rows={2}/>
                        </div>

                        <div className="d-flex justify-content-end mt-2">
                            <button type="button" className="btn btn-danger" onClick={() => removeTier(index)}>Remove</button>
                        </div>
                        </div>
                    ))}
                    
                    <div className="d-flex justify-content-end mb-3">
                        <button type="button" className="btn btn-success mt-3" onClick={addTier}> Add Price </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forms;
