import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.removeItem('token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('You have been logged out.');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">E-Waste Hub</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          // --- Logged-in User View ---
          <>
            {user.user_type === 'Disposer' && (
              <>
                <Link to="/my-listings">My Listings</Link>
                <Link to="/create">Create Listing</Link>
              </>
            )}
            
            {/* The "View Map" link has been removed from the Collector's view */}
            
            <div className="nav-user-info">
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
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