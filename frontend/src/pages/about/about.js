import React from 'react';
import './about.css';
import { Link } from 'react-router-dom';  // Import Link for navigation

function About() {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p>This is the about page of the website.</p>
      {/* Button to navigate back to the Home page */}
      <Link to="/">
        <button>Go Back to Home</button>
      </Link>
    </div>
  );
}

export default About;
