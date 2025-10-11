import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import ListingCard from '../components/ListingCard';
import './HomePage.css'; // New CSS file for the homepage

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState(''); // <-- New state for the filter

  // This useEffect will now re-run whenever the 'filter' state changes
  useEffect(() => {
    const fetchListings = async () => {
      const response = await getAllListings(filter);
      setListings(response.data);
    };
    fetchListings();
  }, [filter]);

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
          {listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;