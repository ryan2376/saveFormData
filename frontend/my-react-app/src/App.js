// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institution from './Institution'; 
import InstitutionSignUp from './InstitutionSignUp'; 
import InstitutionLogin from './InstitutionLogin';
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
        <Route path="/institution-sign-up" element={<InstitutionSignUp />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
