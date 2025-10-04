import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">E-Waste Hub</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Listing</Link>
      </div>
    </nav>
  );
};

export default Navbar;