import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Note the import style
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token); // Decode the token to get user info
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.removeItem('token'); // Clear invalid token
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('You have been logged out.'); // <-- Replace alert
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">E-Waste Hub</Link>
      <div className="nav-links">
        {user ? (
          // --- Logged-in User View ---
          <>
            {/* This answers your question about roles! */}
            {user.user_type === 'Disposer' && <Link to="/create">Create Listing</Link>}
            {user.user_type === 'Collector' && <Link to="/">Browse Listings</Link>}
            {user.user_type === 'Collector' && <Link to="/map">View Map</Link>}
            
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          // --- Logged-out User View ---
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;