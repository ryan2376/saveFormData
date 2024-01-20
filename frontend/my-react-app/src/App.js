// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institution from './Institution'; // Import your Institution component
import Home from './Home';
import NavBar from './Navbar';
// Import other components as needed

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Assuming you have a Home component */}
        <Route path="/institution" element={<Institution />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
