import React from 'react';
import heroImage from './images/david-bruyndonckx-F_hft1Wiyj8-unsplash.jpg';
import projectImage from './images/kazuend-19SC2oaVZW0-unsplash.jpg';
import institutionImage from './images/imat-bagja-gumilar-jwTvCQQJXh0-unsplash.jpg';
import differenceImage from './images/michael-krahn-eGD69I3ODC4-unsplash.jpg';

const Home = () => {
    return (
        <div className="home-container">
            {/* <img src={differenceImage} alt="difference" /> */}

            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">WELCOME TO ACTIVIST CONNECT</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">Connecting activists with institutions for a greener world.</p>
                        
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={projectImage} alt="Project" />
                    </div>  
                    <div className="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fillOpacity="1" d="M0,96L40,112C80,128,160,160,240,144C320,128,400,64,480,58.7C560,53,640,107,720,122.7C800,139,880,117,960,128C1040,139,1120,181,1200,197.3C1280,213,1360,203,1400,197.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
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
                    <img src={heroImage} alt="Hero" />

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
