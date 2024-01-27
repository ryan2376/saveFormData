import React, { useState, useEffect } from 'react';
import './ActivistDashboard.css'

const ActivistDashboard = () => {
    const [activistInfo, setActivistInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        interests: ''
    });
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

    useEffect(() => {
        // Here you would fetch the activist's information from the backend
        // For demonstration, we'll use placeholder data
        const fetchedInfo = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
            location: 'City, Country',
            interests: 'Environmental Conservation'
        };
        setActivistInfo(fetchedInfo);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivistInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send the updated data to the backend
        console.log('Profile Updated:', activistInfo);
        setIsEditing(false);
    };

    return (
        <div className="activist-dashboard">
            <h1>Activist Dashboard</h1>

            {/* Profile Section */}
            <section className="activist-profile">
                <h2>Profile</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        {/* Editable Fields */}
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={activistInfo.firstName}
                                onChange={handleInputChange}
                            />
                        </label>
                        {/* Add other fields similarly */}
                        {/* ... */}
                        <button type="submit">Save Changes</button>
                        <button onClick={handleEditToggle}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        {/* Display Profile Information */}
                        <p>First Name: {activistInfo.firstName}</p>
                        {/* Display other fields */}
                        {/* ... */}
                        <button onClick={handleEditToggle}>Edit Profile</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ActivistDashboard;
