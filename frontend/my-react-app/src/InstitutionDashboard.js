import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
    const [institution, setInstitution] = useState({});
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInstitutionDetails();
    }, []);

    const fetchInstitutionDetails = async () => {
        setLoading(true);
        try {
            const institutionId = localStorage.getItem('institutionId');
            const response = await axios.get(`http://localhost/saveFormData/backend/institutionDashboard.php?institution_id=${institutionId}`);
            setInstitution(response.data.institution);
            setActivities(response.data.activities);
        } catch (error) {
            setError('Failed to fetch institution details');
        } finally {
            setLoading(false);
        }
    };

    const handleEditInstitution = async (field, value) => {
        setLoading(true);
        try {
            const institutionId = localStorage.getItem('institutionId');
            const formData = {
                institution_id: institutionId,
                [field]: value,
            };
            await axios.put(`http://localhost/saveFormData/backend/institutionDashboard.php?id=${institutionId}`, formData);
            fetchInstitutionDetails();
        } catch (error) {
            setError('Failed to update institution details');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteActivity = async (id) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost/saveFormData/backend/institutionDashboard.php?id=${id}`);
                fetchInstitutionDetails();
            } catch (error) {
                setError('Failed to delete activity');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="institution-dashboard">
            <h1>Welcome, {institution.name}</h1>
            <h2>Institution Details</h2>
            <p>
                Contact Person: <input type="text" value={institution.contact_person} onChange={(e) => handleEditInstitution('contact_person', e.target.value)} />
            </p>
            <p>
                Email: <input type="text" value={institution.contact_email} onChange={(e) => handleEditInstitution('contact_email', e.target.value)} />
            </p>
            <p>
                Phone: <input type="text" value={institution.contact_phone} onChange={(e) => handleEditInstitution('contact_phone', e.target.value)} />
            </p>

            <h2>Activities</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className="activities-list">
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            {activity.name} - {activity.date}
                            <button onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InstitutionDashboard;
