import React from 'react';
import heroImage from './images/david-bruyndonckx-F_hft1Wiyj8-unsplash.jpg';
import projectImage from './images/kazuend-19SC2oaVZW0-unsplash.jpg';
import institutionImage from './images/imat-bagja-gumilar-jwTvCQQJXh0-unsplash.jpg';
import differenceImage from './images/michael-krahn-eGD69I3ODC4-unsplash.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1 className="text-4xl font-bold text-white">Welcome to Activist Connect</h1>
                <p className="text-lg text-white">Connecting activists with institutions for a greener world.</p>
                <button className="cta-button mt-4 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">Get Started</button>
            </section>

            <section className="features-section flex justify-between mt-8">
                <div className="feature bg-cover bg-center flex-1 mr-4" style={{ backgroundImage: `url(${projectImage})` }}>
                    <div className="text-white p-8">
                        <h2 className="text-2xl font-bold mb-2">Discover Projects</h2>
                        <p>Find local environmental projects and participate in activities that matter.</p>
                    </div>
                </div>
                <div className="feature bg-cover bg-center flex-1 mx-2" style={{ backgroundImage: `url(${institutionImage})` }}>
                    <div className="text-white p-8">
                        <h2 className="text-2xl font-bold mb-2">Connect with Institutions</h2>
                        <p>Build partnerships with institutions to amplify your environmental impact.</p>
                    </div>
                </div>
                <div className="feature bg-cover bg-center flex-1 ml-4" style={{ backgroundImage: `url(${differenceImage})` }}>
                    <div className="text-white p-8">
                        <h2 className="text-2xl font-bold mb-2">Make a Difference</h2>
                        <p>Join a community dedicated to making positive changes for our planet.</p>
                    </div>
                </div>
            </section>

            {/* Additional sections can go here */}
        </div>
    );
};

export default Home;
