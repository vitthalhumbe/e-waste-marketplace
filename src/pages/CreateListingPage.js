import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';
import toast from 'react-hot-toast';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    device_type: 'Phone',
    condition: '',
    latitude: '',
    longitude: '',
  });
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use FormData to send both text and file data
    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('description', formData.description);
    submissionData.append('device_type', formData.device_type);
    submissionData.append('condition', formData.condition);
    submissionData.append('latitude', formData.latitude);
    submissionData.append('longitude', formData.longitude);
    if (imageFile) {
      submissionData.append('image', imageFile); // 'image' must match the backend
    }
    try {
      await createListing(submissionData);
      toast.success('Listing created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create listing.');
    }
  };


  return (
    <div>
      <h2>Create a New E-Waste Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Device Type:</label>
          <select name="device_type" value={formData.device_type} onChange={handleChange}>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Component">Component</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Condition:</label>
          <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="e.g., Screen cracked" required />
        </div>
        <div>
          <label>Latitude:</label>
          <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g., 19.0760" />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="e.g., 72.8777" />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListingPage;