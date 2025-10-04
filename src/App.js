import React, { useState, useEffect } from 'react';
import { getAllListings } from './services/api'; // Import your service
import ListingCard from './components/ListingCard'; // Import your component
import './App.css';

function App() {
  const [listings, setListings] = useState([]); // State to hold the listings
  const [loading, setLoading] = useState(true);  // State to handle loading status

  useEffect(() => {
    // Fetch listings when the component mounts
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data); // Update state with data from the API
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []); // The empty array ensures this runs only once

  return (
    <div className="App">
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

export default App;