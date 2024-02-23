import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [form, setForm] = useState({
        id: null,
        name: '',
        description: '',
        location: '',
        date: '',
    });

    // Function to fetch activities
    const fetchActivities = async () => {
        const response = await axios.get('http://localhost/saveFormData/backend/institutionDashboard.php');
        setActivities(response.data);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const institutionId = localStorage.getItem('institutionId'); // Retrieve the institution_id from local storage
        const formData = {
            ...form,
            institution_id: institutionId, // Ensure this matches the expected field in your PHP
        };
        const url = 'http://localhost/saveFormData/backend/institutionDashboard.php';
        if (form.id) {
            await axios.post(`${url}?id=${form.id}`, formData);
        } else {
            await axios.post(url, formData);
        }
        setForm({ id: null, name: '', description: '', location: '', date: '' }); // Reset form
        fetchActivities(); // Refresh activities list
    };

    // Function to handle activity deletion
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost/saveFormData/backend/institutionDashboard.php?id=${id}`);
        fetchActivities(); // Refresh the list after deletion
    };

    return (
        <div className="institution-dashboard">
            <h1>Institution Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleInputChange} placeholder="Activity Name" required />
                <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
                <input type="text" name="location" value={form.location} onChange={handleInputChange} placeholder="Location" required />
                <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
                <button type="submit">Submit</button>
            </form>
            <ul className="activities-list">
                {activities.map((activity) => (
                    <li key={activity.id}>
                        {activity.name} - {activity.date}
                        <button onClick={() => setForm({ ...activity })}>Edit</button>
                        <button onClick={() => handleDelete(activity.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstitutionDashboard;
