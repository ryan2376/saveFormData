import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
return (
<div className="home-container">
    <header className="home-header">
    <h1>Welcome to Activist Connect</h1>
    <p>Connecting activists with institutions for a greener world.</p>
    </header>

    <section className="home-content">
    <p>Join us in our effort to make a positive impact on the environment. Whether you're an individual looking to participate in local projects or an institution seeking enthusiastic volunteers, we've got you covered.</p>
    
    <div className="home-actions">
        <Link to="/institution" className="home-link">Institutions</Link>
        <Link to="/activist" className="home-link">Activists</Link>
    </div>
    </section>
</div>
);
};

export default Home;
