// src/pages/EditListingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById, updateListing } from '../services/api';
import toast from 'react-hot-toast';
import './CreateListingPage.css'; // We can reuse the same CSS

const EditListingPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    device_type: '',
    condition: '',
  });

  // Fetch the existing listing data when the page loads
  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await getListingById(id);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          device_type: response.data.device_type,
          condition: response.data.condition,
        });
      } catch (error) {
        toast.error("Could not fetch listing details.");
        navigate('/my-listings');
      }
    };
    fetchListingData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateListing(id, formData);
      toast.success('Listing updated successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error('Failed to update listing.');
    }
  };

  return (
    <div className="create-listing-page">
      <h1>Edit Your E-Waste Item</h1>
      <form onSubmit={handleSubmit} className="create-listing-container-simple">
        <div className="form-section">
          <h3>Item Details</h3>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
          </div>
          {/* ... Add other fields like device_type and condition here, similar to the title input ... */}
        </div>
        <div className="form-submit-area">
          <button type="submit" className="submit-listing-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditListingPage;