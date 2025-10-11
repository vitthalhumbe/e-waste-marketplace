// src/components/SingleListingMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for the default icon issue with Leaflet in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


const SingleListingMap = ({ lat, lng }) => {
  if (!lat || !lng) {
    return <p>Location not provided for this listing.</p>;
  }

  const position = [lat, lng];

  return (
    <div className="single-map-wrapper">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Item Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SingleListingMap;