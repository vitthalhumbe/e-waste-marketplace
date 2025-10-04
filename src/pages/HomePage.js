import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import ListingCard from '../components/ListingCard';
import '../App.css'; // You can keep this for styling

// The function name is changed from App to HomePage
function HomePage() { 
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    // The JSX is the same, but you can remove the outer header if you want
    <div>
      <header className="App-header">
        <h1>E-Waste Marketplace</h1>
      </header>
      <div className="listings-container">
        {loading ? (
          <p>Loading listings...</p>
        ) : (
          listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;