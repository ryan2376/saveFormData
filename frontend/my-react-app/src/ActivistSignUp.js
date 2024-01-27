import React, { useState } from 'react';
import './ActivistSignUpandLogin.css';

const ActivistSignUp = () => {
    const [activistDetails, setActivistDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        interests: '',
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivistDetails({
            ...activistDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/saveFormData/backend/saveActivistData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activistDetails),
            });

            if (response.ok) {
                console.log('Activist data submitted successfully');
                window.location.href = '/activist-login'; // Redirect to login page
            } else {
                console.error('Activist data submission failed');
            }
        } catch (error) {
            console.error('An error occurred during activist data submission:', error);
        }
    };

    return (
        <div className="activist-container">
            <header className="activist-header">
                <h1>Activist Sign-Up</h1>
            </header>

            <section className="activist-form">
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={activistDetails.firstName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={activistDetails.lastName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={activistDetails.email}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={activistDetails.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={activistDetails.location}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Interests:
                        <textarea
                            name="interests"
                            value={activistDetails.interests}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={activistDetails.username}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={activistDetails.password}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button type="submit">Sign Up</button>
                </form>
            </section>
        </div>
    );
};

export default ActivistSignUp;
