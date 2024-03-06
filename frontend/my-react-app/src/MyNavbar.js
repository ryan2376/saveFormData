import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Navbar as FlowbiteNavbar, Button as FlowbiteButton } from 'flowbite-react';
import { Avatar, Dropdown } from 'flowbite-react';

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
        <div className="flex md:order-2">
        <FlowbiteButton>Get started</FlowbiteButton>
        <FlowbiteNavbar.Toggle />
        </div>
        <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link as={Link} to="/"active>Home</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">About</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="/activist-login">Activist</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="/institution-login">Institution</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">Contact</FlowbiteNavbar.Link>
        </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
    );
    }

export default MyNavbar;
