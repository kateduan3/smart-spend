import React, { useState } from 'react';
import './login.css';  // Styling for login page
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Hardcoded example credentials for now
    const validUsername = 'user@example.com';
    const validPassword = 'password123';

    // Check if username/email and password match
    if (username === validUsername && password === validPassword) {
      setError('');  // Clear error
      alert('Login successful!');  // Placeholder for successful login action
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Log in</h1>
      
      {/* Username/email input */}
      <input
        type="text"
        placeholder="Email address or user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      {/* Error message */}
      {error && <p className="error-text">{error}</p>}

      {/* Log in button */}
      <button className="login-button" onClick={handleLogin}>
        Log in
      </button>

      {/* Forgot password button */}
      <button className="forgot-password">Forgot your password</button>

      {/* Terms and policy */}

      {/* Link to Sign up page */}
      <p className="signup">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
