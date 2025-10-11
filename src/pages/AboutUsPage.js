// src/pages/AboutUsPage.js
import React from 'react';
import './StaticPages.css'; // We'll use a shared CSS file for all static pages

const AboutUsPage = () => {
  return (
    <div className="static-page-container">
      <div className="static-page-content">
        <h1>About E-Waste Hub</h1>
        <p className="subtitle">Connecting communities to combat electronic waste and promote a circular economy.</p>
        
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to create a sustainable future by transforming the way we handle electronic waste. We believe that every discarded device holds potential—whether as a source of spare parts for repair, a canvas for an artist, or raw materials for a new product. By connecting disposers with collectors, we aim to extend the lifecycle of electronics, reduce landfill waste, and conserve precious natural resources.
          </p>
        </div>

        <div className="section">
          <h2>What We Do</h2>
          <p>
            E-Waste Hub is a "Craigslist for E-Waste." It's a platform that directly connects individuals who have old or broken electronics with local repair shops, artists, students, and certified recyclers who can give these items a second life. Our goal is to prioritize reuse and repair—the most effective steps in the circular economy—before recycling.
          </p>
        </div>

        <div className="section">
          <h2>Why It Matters</h2>
          <p>
            Electronic waste is the fastest-growing stream of waste globally. When improperly disposed of, it leaches toxic materials into our soil and water. By facilitating local reuse, we not only prevent pollution but also strengthen local economies, support the right-to-repair movement, and foster a community of conscious consumers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;