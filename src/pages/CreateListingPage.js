// src/pages/CreateListingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';
import toast from 'react-hot-toast';
import LocationPicker from '../components/LocationPicker';
import './CreateListingPage.css';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    device_type: 'Phone',
    condition: '',
  });
  const [location, setLocation] = useState(null);
  const [imageFile, setImageFile] = useState(null); // We only need to store the file itself
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simplified file handler
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      toast.error('Please search for and select a location.');
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
    submissionData.append('latitude', location.lat);
    submissionData.append('longitude', location.lng);

    if (imageFile) {
      submissionData.append('image', imageFile);
    }
    
    try {
      await createListing(submissionData);
      toast.success('Listing created successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error('Failed to create listing.');
    }
  };

  return (
    <div className="create-listing-page">
      <h1>List Your E-Waste Item</h1>
      <form onSubmit={handleSubmit} className="create-listing-container">
        {/* Left Column: Core Details */}
        <div className="form-column">
          <div className="form-section">
            <h3>Item Details</h3>
            {/* ... title, description, device_type, condition fields ... */}
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" onChange={handleChange} placeholder="e.g., iPhone X - For Parts" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" onChange={handleChange} rows="5" placeholder="Describe the item, its condition, and any issues." required />
            </div>
            <div className="form-group">
              <label>Device Type</label>
              <select name="device_type" value={formData.device_type} onChange={handleChange}>
                <option value="Phone">Phone</option>
                <option value="Laptop">Laptop</option>
                <option value="Component">Component</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Condition</label>
              <input type="text" name="condition" onChange={handleChange} placeholder="e.g., Screen cracked, won't turn on" required />
            </div>
          </div>
        </div>

        {/* Right Column: Location & Image */}
        <div className="form-column">
          <div className="form-section">
            <h3>Location</h3>
            <LocationPicker onLocationSelect={setLocation} />
          </div>
          <div className="form-section">
            <h3>Upload Image</h3>
            {/* --- THIS IS THE SIMPLIFIED INPUT --- */}
            <div className="form-group">
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit-area">
          <button type="submit" className="submit-listing-btn">Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;