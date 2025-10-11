// src/pages/MyListingsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. ADD 'updateListingStatus' to the import
import { getMyListings, deleteListing, updateListingStatus } from '../services/api';
import ListingCard from '../components/ListingCard';
import toast from 'react-hot-toast';
import './MyListingPage.css'; // Corrected the filename typo

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

  // 2. ADD THE MISSING 'handleDelete' function here
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

 // src/pages/MyListingsPage.js

  const handleMarkAsCollected = async (listingId) => {
    try {
      await updateListingStatus(listingId);
      toast.success('Listing marked as collected! You earned 10 points.');
      
      // Reload the page to refresh the navbar and show the new point total
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Wait 1.5 seconds for the user to read the toast

    } catch (error) {
      toast.error('Failed to update status.');
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
              {listing.status === 'Available' && (
                <div className="controls">
                  <Link to={`/edit-listing/${listing._id}`} className="update-btn">Update</Link>
                  <button className="delete-btn" onClick={() => handleDelete(listing._id)}>Delete</button>
                  <button className="collected-btn" onClick={() => handleMarkAsCollected(listing._id)}>Mark as Collected</button>
                </div>
              )}
              {listing.status === 'Collected' && (
                <div className="status-banner">Collected</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any listings yet.</p>
      )}
    </div>
  );
};

export default MyListingsPage;