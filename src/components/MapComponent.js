import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

// --- Start of the fix ---
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- End of the fix ---


const MapComponent = ({ listings }) => {
  // Set the default map center to somewhere in India
  const position = [20.5937, 78.9629]; 

  return (
    <MapContainer center={position} zoom={5} style={{ height: '500px', width: '100%' }}>
      {/* This is the base map layer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Map over the listings and create a marker for each one */}
      {listings.map(listing => (
        // Only render a marker if the listing has both latitude and longitude
        listing.latitude && listing.longitude && (
          <Marker key={listing._id} position={[listing.latitude, listing.longitude]}>
            <Popup>
              <b>{listing.title}</b><br />
              {listing.condition}<br />
              {/* You can add a link to the detailed listing page later */}
              {/* <Link to={`/listings/${listing._id}`}>View Details</Link> */}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapComponent;