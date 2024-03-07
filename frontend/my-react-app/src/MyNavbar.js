import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Navbar as FlowbiteNavbar } from 'flowbite-react';

const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <FlowbiteNavbar fluid rounded>
            <FlowbiteNavbar.Brand href="https://flowbite-react.com">
                <img src="favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> 
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Activist Connect</span>
            </FlowbiteNavbar.Brand>
            <FlowbiteNavbar.Collapse className={isOpen ? 'nav-links open' : 'nav-links'}>
                <FlowbiteNavbar.Link as={Link} to="/" className="nav-link">Home</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#" className="nav-link">About</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link as={Link} to="/activist-login" className="nav-link">Activist</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link as={Link} to="/institution-login" className="nav-link">Institution</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#" className="nav-link">Contact</FlowbiteNavbar.Link>
            </FlowbiteNavbar.Collapse>
            <button className="nav-toggle" onClick={toggleNav}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>
        </FlowbiteNavbar>
    );
}

export default MyNavbar;
