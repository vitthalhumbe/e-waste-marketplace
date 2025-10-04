import React, { useState, useEffect } from 'react';
import { getAllListings } from '../services/api';
import MapComponent from '../components/MapComponent';
import toast from 'react-hot-toast';

const MapPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        toast.error("Failed to fetch listings for the map.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <p>Loading map data...</p>;
  }

  return (
    <div>
      <h2>E-Waste Listings Map</h2>
      <MapComponent listings={listings} />
    </div>
  );
};

export default MapPage;