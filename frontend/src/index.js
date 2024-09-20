import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';  // Global styles
import Home from './pages/home/home';  // Import Home component
import About from './pages/about/about';  // Import About component
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import App from './App';  // Global wrapper component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </App>
  </Router>
);
