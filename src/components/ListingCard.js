import React from 'react';
import './ListingCard.css'; // We'll create this file for styling

const ListingCard = ({ listing }) => {
  return (
    <div className="card">
      <h3>{listing.title}</h3>
      <p><strong>Device:</strong> {listing.device_type}</p>
      <p><strong>Condition:</strong> {listing.condition}</p>
      <p><strong>Posted by:</strong> {listing.disposer_id ? listing.disposer_id.username : 'Unknown'}</p>
    </div>
  );
};

export default ListingCard;