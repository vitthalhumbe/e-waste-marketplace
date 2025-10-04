import React from 'react';
import './ListingCard.css'; // We'll create this file for styling

const ListingCard = ({ listing }) => {
  return (
    <div className="card">
      <h3>{listing.title}</h3>
      <p><strong>Device:</strong> {listing.device_type}</p>
      <p><strong>Condition:</strong> {listing.condition}</p>
    </div>
  );
};

export default ListingCard;