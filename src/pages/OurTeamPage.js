// src/pages/OurTeamPage.js
import React from 'react';
import './StaticPages.css';

// You can replace this with your actual details
const teamMembers = [
  {
    name: 'Vitthal Humbe',
    role: 'Founder & Lead Developer',
    imageUrl: 'https://via.placeholder.com/150', // Replace with your image URL
    bio: 'A passionate developer and environmental advocate dedicated to finding technological solutions for real-world problems. This project is a part of the E-Waste Management subject assignment.',
    linkedin: '#', // Replace with your LinkedIn URL
  },
  // You can add more team members here in the future
];

const OurTeamPage = () => {
  return (
    <div className="static-page-container">
      <div className="static-page-content">
        <h1>Our Team</h1>
        <p className="subtitle">The people driving the mission of responsible e-waste management.</p>

        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.name} className="team-member-card">
              <img src={member.imageUrl} alt={member.name} />
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                Connect on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeamPage;