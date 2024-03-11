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
        setLoginDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/saveFormData/backend/activistLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming data contains an 'activistId' property with the logged-in activist's ID
                localStorage.setItem('activistId', data.activistId);
                // Redirect to the dashboard
                window.location.href = '/activist-dashboard';
            } else {
                setError(data.message || 'Incorrect username or password. Please try again.');
            }
        } catch (error) {
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
                    <button type="submit" className='login-button'>Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </section>
        </div>
    );
};

export default ActivistLogin;
