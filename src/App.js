import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreateListingPage from './pages/CreateListingPage';
import Navbar from './components/Navbar';
import MyListingsPage from './pages/MyListingsPage';
import MapPage from './pages/MapPage';
import AboutUsPage from './pages/AboutUsPage';
import OurTeamPage from './pages/OurTeamPage';
import SDGsPage from './pages/SDGsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import { Toaster } from 'react-hot-toast';
import EditListingPage from './pages/EditListingPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateListingPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />}  />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            <Route path="/edit-listing/:id" element={<EditListingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutUsPage />} />
<Route path="/team" element={<OurTeamPage />} />
<Route path="/sdgs" element={<SDGsPage />} />
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;