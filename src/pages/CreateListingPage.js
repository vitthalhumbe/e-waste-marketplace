import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/api';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    device_type: 'Phone',
    condition: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      await createListing(formData);
      alert('Listing created successfully!');
      navigate('/'); // Redirect to homepage after successful creation
    } catch (error) {
      console.error('Failed to create listing:', error);
      alert('Failed to create listing.');
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
          <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="e.g., Screen cracked" required/>
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListingPage;