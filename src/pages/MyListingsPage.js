// src/pages/MyListingsPage.js
import React, { useState, useEffect } from 'react';
import { getMyListings, deleteListing } from '../services/api';
import ListingCard from '../components/ListingCard';
import toast from 'react-hot-toast';
import './MyListingPage.css'; // New CSS file

const MyListingsPage = () => {
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await getMyListings();
      setMyListings(response.data);
    } catch (error) {
      toast.error("Failed to fetch your listings.");
    }
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteListing(listingId);
        toast.success('Listing deleted!');
        fetchUserListings(); // Refresh the list
      } catch (error) {
        toast.error('Could not delete listing.');
      }
    }
  };

  return (
    <div className="my-listings-page">
      <h1>My Listings</h1>
      {myListings.length > 0 ? (
        <div className="listings-grid">
          {myListings.map(listing => (
            <div key={listing._id} className="listing-with-controls">
              <ListingCard listing={listing} />
              <div className="controls">
                <button className="update-btn">Update</button>
                <button className="delete-btn" onClick={() => handleDelete(listing._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any listings yet.</p>
      )}
    </div>
  );
};

export default  MyListingsPage;