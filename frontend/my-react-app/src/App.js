import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Institution from './Institution'; 
import InstitutionSignUp from './InstitutionSignUp'; 
import InstitutionLogin from './InstitutionLogin';
import InstitutionDashboard from './InstitutionDashboard';
import Home from './Home';
import NavBar from './Navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/institution" element={<Institution />} /> */}
        <Route path="/institution-sign-up" element={<InstitutionSignUp />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />
        <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
