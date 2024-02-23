import React, { useState } from 'react';
import './InstitutionSignUpandLogin.css';

const InstitutionLogin = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/saveFormData/backend/institutionLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming data contains an 'institutionId' property with the logged-in institution's ID
                localStorage.setItem('institutionId', data.institutionId);
                // Redirect to the dashboard
                window.location.href = '/institution-dashboard';
            } else {
                setError(data.message || 'Incorrect username or password. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="institution-container">
            <header className="institution-header">
                <h1>Institution Login</h1>
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
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={loginDetails.password}
                            onChange={handleLoginInputChange}
                            required
                        />
                    </label>
                    <button type="submit">Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </section>
        </div>
    );
};

export default InstitutionLogin;
