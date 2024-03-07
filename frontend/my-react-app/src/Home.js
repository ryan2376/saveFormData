import React from 'react';
import heroImage from './images/david-bruyndonckx-F_hft1Wiyj8-unsplash.jpg';
import projectImage from './images/kazuend-19SC2oaVZW0-unsplash.jpg';
import institutionImage from './images/imat-bagja-gumilar-jwTvCQQJXh0-unsplash.jpg';
import differenceImage from './images/michael-krahn-eGD69I3ODC4-unsplash.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">WELCOME TO ACTIVIST CONNECT</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">Connecting activists with institutions for a greener world.</p>
                        
            
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={heroImage} alt="Hero" />
                    </div>                
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto flex flex-col justify-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-center">JOIN OTHER ENVIRONMENT LOVERS IN THE JOURNEY TO A GREENER WORLD</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">Connecting activists with institutions for a greener world.</p>
                        <a href="/activist-sign-up" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600 dark:focus:ring-teal-300">
                            Activist Sign Up
                        </a>  
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={projectImage} alt="Project" />
                    </div>                
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={institutionImage} alt="Institution" />
                    </div>
                    <div className="mr-auto flex flex-col justify-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-center">Join a community dedicated to making positive changes for our planet</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">Connecting activists with institutions for a greener world.</p>
                        <a href="/institution-sign-up" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600 dark:focus:ring-teal-300">
                            Institution Sign Up
                        </a>  
                    </div>
                                    
                </div>
            </section>

            {/* Additional sections can go here */}
        </div>
    );
};

export default Home;
