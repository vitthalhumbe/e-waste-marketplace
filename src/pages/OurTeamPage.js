// src/pages/OurTeamPage.js
import React from 'react';
import './StaticPages.css';
// Assuming you've imported your images like this if they are in src/assets
import vitthalImage from '../assets/vitthal.jpg';
import vaibhaviImage from '../assets/Vaibhavi.jpg'; // Make sure these paths are correct
import vaishnaviImage from '../assets/Vaishnavi.jpg';
import prajaktaImage from '../assets/prajkta.jpg';

const teamMembers = [
  {
    name: 'Vitthal Humbe',
    role: 'Full stack Developer & Lead',
    imageUrl: vitthalImage, // Use the imported variable
    bio: 'Led the project development, architecting both the backend and frontend systems to bring the E-Waste Hub vision to life.',
    linkedin: 'https://www.linkedin.com/in/vitthal-humbe-75382b217/', // Add actual LinkedIn
  },
  {
    name: 'Vaibhavi Swami',
    role: 'Frontend dev and UI/UX designer',
    imageUrl: vaibhaviImage, // Use the imported variable
    bio: 'Designed the user interface and experience, crafting a professional, intuitive, and visually appealing platform for all users.',
    linkedin: '#',
  },
  {
    name: 'Vaishnavi Dalve',
    role: 'Database manager',
    imageUrl: vaishnaviImage, // Use the imported variable
    bio: 'Managed the database schema and ensured data integrity, building the foundation for storing and retrieving user and listing information.',
    linkedin: '#',
  },
  {
    name: 'Prajakta Naiknavare',
    role: 'Documentation Lead',
    imageUrl: prajaktaImage, // Use the imported variable
    bio: 'Oversaw the project documentation, ensuring clarity, consistency, and a comprehensive record of the project\'s features and architecture.',
    linkedin: '#',
  },
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
              <img src={member.imageUrl} alt={member.name} className="team-member-image" /> {/* Added class here */}
              <h3>{member.name}</h3>
              <h4>{member.role}</h4> {/* This is the role */}
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