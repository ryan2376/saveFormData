import React from 'react';
import './Home.css';

const Home = () => {
return (
<div className="home-container">
    <section className="hero-section">
    <h1>Welcome to Activist Connect</h1>
    <p>Connecting activists with institutions for a greener world.</p>
    <button className="cta-button">Get Started</button>
    </section>

    <section className="features-section">
    <div className="feature feature1" style={{ backgroundImage: ('C:/xampp/htdocs/saveFormData/frontend/my-react-app/src/images/david-bruyndonckx-F_hft1Wiyj8-unsplash.jpg')}}>
        <h2>Discover Projects</h2>
        <p>Find local environmental projects and participate in activities that matter.</p>
    </div>
    <div className="feature feature2" style={{ backgroundImage: ('C:/xampp/htdocs/saveFormData/frontend/my-react-app/src/images/imat-bagja-gumilar-jwTvCQQJXh0-unsplash.jpg')}}>
        <h2>Connect with Institutions</h2>
        <p>Build partnerships with institutions to amplify your environmental impact.</p>
    </div>
    <div className="feature feature3" style={{ backgroundImage: ('C:/xampp/htdocs/saveFormData/frontend/my-react-app/src/images/miha-rekar-gzMvo6cR6J0-unsplash.jpg')}}>
        <h2>Make a Difference</h2>
        <p>Join a community dedicated to making positive changes for our planet.</p>
    </div>
    </section>

    {/* Additional sections can go here */}
</div>
);
};

export default Home;
