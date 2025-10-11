// src/pages/CreateListingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';
import toast from 'react-hot-toast';
import './CreateListingPage.css'; // We'll create a new CSS file

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    device_type: 'Phone',
    condition: '',
    latitude: '',
    longitude: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    // Append all form data
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
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

      {/* The <form> tag is the flex container */}
      <form onSubmit={handleSubmit} className="create-listing-container">

        {/* This is the FIRST direct child */}
        <div className="form-column">
          <div className="form-section">
            <h3>Item Details</h3>
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

        {/* This is the SECOND direct child */}
        <div className="form-column">
          <div className="form-section">
            <h3>Location</h3>
            <div className="form-group">
              <label>Latitude</label>
              <input type="number" name="latitude" step="any" onChange={handleChange} placeholder="e.g., 19.0760" />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input type="number" name="longitude" step="any" onChange={handleChange} placeholder="e.g., 72.8777" />
            </div>
          </div>
          <div className="form-section">
            <h3>Upload Image</h3>
            <div className="image-upload-box">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <p>Click to select an image</p>
              )}
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>
        </div>

        {/* This is the THIRD direct child */}
        <div className="form-submit-area">
          <button type="submit" className="submit-listing-btn">Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;