import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';  // Import Link for navigation

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Homepage!</h1>
      <p>This is the homepage of the website.</p>
      <Link to="/about">
        <button>Go to About Page</button>
      </Link>
    </div>
  );
}

export default Home;
