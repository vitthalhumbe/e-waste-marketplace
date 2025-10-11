import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  return (
    // Wrap the card in a Link to the detail page
    <Link to={`/listing/${listing._id}`} className="listing-card-link">
      <div className="listing-card">
        <img src={listing.imageUrl || 'https://via.placeholder.com/300'} alt={listing.title} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{listing.title}</h3>
          <p className="card-condition">Condition: {listing.condition}</p>
          <p className="card-posted-by">
            Posted by: {listing.disposer_id ? listing.disposer_id.username : 'Unknown'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;