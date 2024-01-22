// InstitutionLogin.js

import React, { useState } from 'react';
import './Institution.css';

const InstitutionLogin = () => {
const [loginDetails, setLoginDetails] = useState({
username: '',
password: '',
});

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
    const response = await fetch('http://localhost/saveFormData/backend/institutionLogin.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
    });

    if (response.ok) {
    console.log('Institution login successful');

    // Redirect to the dashboard or perform other actions upon successful login
    window.location.href = '/institution-dashboard'; // Change the path accordingly
    } else {
    console.error('Institution login failed');
    // Handle login failure, e.g., show an error message to the user
    }
} catch (error) {
    console.error('An error occurred during institution login:', error);
}
};

return (
<div className="institution-container">
    <header className="institution-header">
    <h1>Institution Login</h1>
    </header>

    <section className="login-form">
    <form onSubmit={handleLoginSubmit}>
        {/* Include username and password fields for login */}
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
    </form>
    </section>
</div>
);
};

export default InstitutionLogin;
