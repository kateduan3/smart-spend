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
        <Link to="/upload">
              <button className="upload-button">Upload</button>
            </Link>
      </header>

      {/* Scrollable container */}
      <div className="home-scroll-container">
        {/* First home-top section */}
        <div className="home-top">
          <div className="main-content">
            <h1 className="big-text">Welcome to SmartSpend</h1>
            <p className="main-description">Take control of your finances by tracking your expenses and budget with ease.</p>
            <Link to="/login">
              <button className="register-button">Get Started</button>
            </Link>
          </div>
          <div className="image-section">
            <img src={process.env.PUBLIC_URL + '/static/illustration.png'} alt="Illustration" className="illustration-img" />
          </div>
        </div>

        {/* Second home-top section (another set of content for scrolling) */}
        <div className="home-top">
          <div className="main-content">
            <h1 className="big-text">Safe and Secure</h1>
            <p className="main-description">Your Information is safe with us. We will not ask you to provide any sensitive data.</p>
            <Link to="/login">
              <button className="register-button">Get Started</button>
            </Link>
          </div>
          <div className="image-section">
            <img src={process.env.PUBLIC_URL + '/static/illustration2.png'} alt="Second Illustration" className="illustration-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
