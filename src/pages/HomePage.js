// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import ListingCard from '../components/ListingCard';
import './HomePage.css';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings(filter);
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListings();
  }, [filter]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Give Your Tech a Second Life</h1>
        <p>Find parts, fuel creativity, or recycle responsibly.</p>
      </section>

      {/* Listings Section */}
      <section className="listings-section">
        <div className="filter-container">
          <h2>Recent Listings</h2>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="">All Types</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Component">Component</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="listings-grid">
          {listings.length > 0 ? (
            listings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          ) : (
            <p className="no-listings-message">No listings found. Try adjusting your filters.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;