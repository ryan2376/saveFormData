import React, { useState } from 'react';
import './ActivistSignUpandLogin.css';

const ActivistLogin = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login details to the server for authentication
            const response = await fetch('http://localhost/saveFormData/backend/activistLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            if (response.ok) {
                console.log('Activist login successful');
                // Handle successful login, e.g., redirect to dashboard or set user context
                 window.location.href = '/activist-dashboard'; // Adjust the redirection as needed
            } else {
                const errorMessage = await response.text();
                console.error(`Activist login failed: ${errorMessage}`);
                setError('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred during activist login:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="activist-container">
            <header className="activist-header">
                <h1>Activist Login</h1>
            </header>

            <section className="login-form">
                <form onSubmit={handleLoginSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={loginDetails.username}
                            onChange={handleLoginInputChange}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={loginDetails.password}
                            onChange={handleLoginInputChange}
                        />
                    </label>

                    <button type="submit">Login</button>

                    {error && <p className="error-message">{error}</p>}
                </form>
            </section>
        </div>
    );
};

export default ActivistLogin;
