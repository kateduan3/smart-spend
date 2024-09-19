import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Custom Website</h1>
        <p>This is the homepage.</p>
        {/* Button that navigates to the About page */}
        <Link to="/about">
          <button>Go to About Page</button>
        </Link>
      </header>
    </div>
  );
}

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>About Page</h1>
        <p>This is the about page of the website.</p>
        {/* Button to go back to the homepage */}
        <Link to="/">
          <button>Go Back to Home</button>
        </Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Define Routes for Home and About */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
