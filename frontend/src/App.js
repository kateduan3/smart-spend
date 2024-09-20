import React from 'react';
import './App.css';  // Global styles (optional)

function App({ children }) {
  return (
    <div>
      {children}  {/* This will render the routes (Home, About, etc.) */}
    </div>
  );
}

export default App;
