// NavBar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);

const toggleNav = () => {
setIsOpen(!isOpen);
};

return (
<nav className="navbar">
    <div className="navbar-brand">Activist Connect</div>
    <button className="nav-toggle" onClick={toggleNav}>
    {/* Icon for the toggle button */}
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
    </button>
    <ul className={`nav-links ${isOpen ? "nav-active" : ""}`}>
    {/* Navigation Links */}
    <li><Link to="/" className="nav-item">Home</Link></li>
    <li><Link to="/institution" className="nav-item">Institution</Link></li>
    <li><Link to="/activist" className="nav-item">Activist</Link></li>
    {/* More links */}
    </ul>
</nav>
);
};

export default Navbar;
