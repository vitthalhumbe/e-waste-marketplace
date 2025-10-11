// src/pages/ListingDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../services/api';
import toast from 'react-hot-toast';
import './ListingDetailPage.css'; // New CSS file

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(id);
        setListing(response.data);
      } catch (error) {
        toast.error("Could not fetch listing details.");
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="detail-page-container">
      <div className="image-container">
        <img src={listing.imageUrl || 'https://via.placeholder.com/600'} alt={listing.title} />
      </div>
      <div className="info-container">
        <h1>{listing.title}</h1>
        <p className="posted-by">
          Listed by: <strong>{listing.disposer_id?.username || 'Unknown'}</strong>
        </p>
        <div className="info-section">
          <h3>Description</h3>
          <p>{listing.description}</p>
        </div>
        <div className="info-section">
          <h3>Details</h3>
          <ul>
            <li><strong>Condition:</strong> {listing.condition}</li>
            <li><strong>Device Type:</strong> {listing.device_type}</li>
          </ul>
        </div>
        <button className="contact-button">Contact Disposer</button>
      </div>
    </div>
  );
};

export default ListingDetailPage;