import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import ListingCard from '../components/ListingCard';
import './HomePage.css'; // New CSS file for the homepage

const HomePage = () => {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    const fetchListings = async () => {
      const response = await getAllListings();
      setListings(response.data);
    };
    fetchListings();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Give Your Tech a Second Life</h1>
        <p>Find parts, fuel creativity, or recycle responsibly.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for 'iPhone screen', 'laptop parts'..." />
          <button>Search</button>
        </div>
      </section>

      {/* Listings Section */}
      <section className="listings-section">
        <h2>Recent Listings</h2>
        <div className="listings-grid">
          {listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;