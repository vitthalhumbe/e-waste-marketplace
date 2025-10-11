import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import ListingCard from '../components/ListingCard';
import { deleteListing } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import '../App.css'; // You can keep this for styling
const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from token
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    }
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await getAllListings();
      setListings(response.data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteListing(listingId);
        toast.success('Listing deleted!');
        fetchListings(); // Refresh the list
      } catch (error) {
        toast.error('Could not delete listing.');
      }
    }
  };

  return (
    // The JSX is the same, but you can remove the outer header if you want
    <div>
      <header className="App-header">
        <h1>E-Waste Marketplace</h1>
      </header>
      <div className="listings-container">
        {listings.map(listing => (
          <div key={listing._id}>
            <ListingCard listing={listing} />
            {/* Show buttons only if the user is logged in and owns the listing */}
            {user && user.id === listing.disposer_id && (
              <div>
                <button>Update</button> {/* We'll add update logic later */}
                <button onClick={() => handleDelete(listing._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;