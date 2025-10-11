// src/components/LocationPicker.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// This is a helper component to move the map view when a location is selected
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 14); // Zoom in closer
  return null;
};

const LocationPicker = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null); // No marker by default
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India

  useEffect(() => {
    // This is a "debounce" timer. It waits 500ms after the user stops typing
    // before making an API call, which is much more efficient.
    const timer = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
        params: {
          key: process.env.REACT_APP_LOCATIONIQ_KEY,
          q: query,
          format: 'json',
          addressdetails: 1, // Get more details
          limit: 5,
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Failed to fetch location suggestions:", error);
    }
  };
  
  const handleSelect = (location) => {
    const lat = parseFloat(location.lat);
    const lon = parseFloat(location.lon);
    
    setQuery(location.display_name); // Set input to the full, clear address
    setSuggestions([]); // Hide the suggestions list
    setMarkerPosition([lat, lon]); // Place the pin on the map
    setMapCenter([lat, lon]); // Center the map on the pin
    
    // Send the selected location back to the form
    onLocationSelect({ lat: lat, lng: lon });
  };

  return (
    <div className="location-picker-container">
      <div className="city-search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing an address or landmark..."
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((loc) => (
              <li key={loc.place_id} onClick={() => handleSelect(loc)}>
                {loc.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="map-wrapper">
        <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markerPosition && <Marker position={markerPosition} />}
          <ChangeView center={mapCenter} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;