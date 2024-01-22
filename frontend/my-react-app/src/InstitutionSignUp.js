import React, { useState } from 'react';
import './Institution.css';

const InstitutionSignUp = () => {
const [institutionDetails, setInstitutionDetails] = useState({
    name: '',
    location: '',
    activities: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    username: '', // Include username in the sign-up form
    password: '', // Include password in the sign-up form
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstitutionDetails({
    ...institutionDetails,
    [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // Save institution details to the database (including username and password)
    const response = await fetch('http://localhost/saveFormData/backend/saveInstitutionData.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(institutionDetails),
    });

    if (response.ok) {
        console.log('Institution data submitted successfully');

        // Redirect to the login page after successful sign-up
        window.location.href = '/institution-login'; // Change the path accordingly
    } else {
        console.error('Institution data submission failed');
        // Handle failure, e.g., show an error message to the user
    }
    } catch (error) {
    console.error('An error occurred during institution data submission:', error);
    }
};


return (
<div className="institution-container">
    <header className="institution-header">
    <h1>Institution Sign-Up</h1>
    </header>

    <section className="institution-form">
    <h2>Enter Institution Details</h2>
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input
            type="text"
            name="name"
            value={institutionDetails.name}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Location:
        {/* You can include a map API integration for location input */}
        <input
            type="text"
            name="location"
            value={institutionDetails.location}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Activities:
        <textarea
            name="activities"
            value={institutionDetails.activities}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Contact Person:
        <input
            type="text"
            name="contactPerson"
            value={institutionDetails.contactPerson}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Contact Email:
        <input
            type="email"
            name="contactEmail"
            value={institutionDetails.contactEmail}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Contact Phone:
        <input
            type="tel"
            name="contactPhone"
            value={institutionDetails.contactPhone}
            onChange={handleInputChange}
        />
        </label>
        </form>
        </section>
        <section className="login-form">
        <h2>Institution Login Details</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Include username and password fields for login */}
        <label>
        Username:
        <input
            type="text"
            name="username"
            value={institutionDetails.username}
            onChange={handleInputChange}
        />
        </label>

        <label>
        Password:
        <input
            type="password"
            name="password"
            value={institutionDetails.password}
            onChange={handleInputChange}
        />
        </label>
        <button type="submit">Sign Up</button>
    </form>
    </section>
</div>
);
};

export default InstitutionSignUp;
