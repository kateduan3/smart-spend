import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';  // Link to navigate to login page

function Home() {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">SmartSpend</div>
        <Link to="/login">
          <button className="register-button">Register Now</button>
        </Link>
      </header>

      {/* Main content can go here */}
    </div>
  );
}

export default Home;
