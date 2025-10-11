// src/pages/SDGsPage.js
import React from 'react';
import './StaticPages.css';

const SDGsPage = () => {
  return (
    <div className="static-page-container">
      <div className="static-page-content">
        <h1>Mapping to Sustainable Development Goals (SDGs)</h1>
        <p className="subtitle">Our commitment to a better planet aligns with the global goals set by the United Nations.</p>

        <div className="sdg-card">
          <div className="sdg-icon">SDG 11</div>
          <div className="sdg-content">
            <h2>Goal 11: Sustainable Cities and Communities</h2>
            <p>
              By creating a local marketplace for e-waste, we directly contribute to making cities more sustainable. Our platform reduces the amount of hazardous waste sent to landfills within urban areas. It also fosters a local economy of repair and reuse, strengthening community resilience and promoting resource efficiency in cities like Kolhapur and beyond.
            </p>
          </div>
        </div>

        <div className="sdg-card">
          <div className="sdg-icon">SDG 12</div>
          <div className="sdg-content">
            <h2>Goal 12: Responsible Consumption and Production</h2>
            <p>
              This is the core of our mission. E-Waste Hub is a tool for responsible consumption. Instead of the linear "take-make-dispose" model, we facilitate a circular one. By giving users a simple way to pass on their old electronics for reuse, we dramatically reduce the need for virgin materials and promote a production cycle where resources are kept in use for as long as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGsPage;