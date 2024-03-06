import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Institution from './Institution'; 
import InstitutionSignUp from './InstitutionSignUp'; 
import InstitutionLogin from './InstitutionLogin';
import InstitutionDashboard from './InstitutionDashboard';
import ActivistSignUp from './ActivistSignUp';
import ActivistLogin from './ActivistLogin';
import ActivistDashboard from './ActivistDashboard';
import Home from './Home';
import MyNavbar from './MyNavbar';
import MapTest from './MapTest';

// import DebugComponent from './DebugComponent';

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/institution" element={<Institution />} /> */}
        <Route path="/institution-sign-up" element={<InstitutionSignUp />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />
        <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
        <Route path="/activist-sign-up" element={<ActivistSignUp/>} />
        <Route path="/activist-login" element={<ActivistLogin />} />
        <Route path='/activist-dashboard' element={<ActivistDashboard/>} />
        <Route path='/MapTest' element={<MapTest/>}/>
        {/* <Route path='/debug' element={<DebugComponent />} /> */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
