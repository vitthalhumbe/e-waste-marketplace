import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreateListingPage from './pages/CreateListingPage';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage';
import ListingDetailPage from './pages/ListingDetailPage';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
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
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;