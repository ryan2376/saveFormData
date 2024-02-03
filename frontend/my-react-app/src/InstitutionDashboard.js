import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstitutionDashboard = () => {
const [activities, setActivities] = useState([]);
const [form, setForm] = useState({ id: null, name: '', description: '', location: '', date: '' });

const fetchActivities = async () => {
const response = await axios.get('http://localhost/saveFormData/backend/institutionDashboard.php');
setActivities(response.data);
};

useEffect(() => {
fetchActivities();
}, []);

const handleInputChange = (e) => {
const { name, value } = e.target;
setForm({ ...form, [name]: value });
};

const handleSubmit = async (e) => {
e.preventDefault();
const url = 'http://localhost/saveFormData/backend/institutionDashboard.php';
if (form.id) {
    await axios.post(`${url}?id=${form.id}`, form);
} else {
    await axios.post(url, form);
}
setForm({ id: null, name: '', description: '', location: '', date: '' });
fetchActivities();
};

const handleEdit = (activity) => {
setForm(activity);
};

const handleDelete = async (id) => {
await axios.delete(`http://localhost/saveFormData/backend/institutionDashboard.php?id=${id}`);
fetchActivities();
};

return (
<div className="institution-dashboard">
    <h1>Institution Dashboard</h1>
    <form onSubmit={handleSubmit}>
    <input name="name" value={form.name} onChange={handleInputChange} placeholder="Activity Name" required />
    <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
    <input name="location" value={form.location} onChange={handleInputChange} placeholder="Location" required />
    <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
    <button type="submit">Submit</button>
    </form>
    <ul>
    {Array.isArray(activities) && activities.map(activity => (
    <li key={activity.id}>
    {activity.name} - {activity.date}
    <button onClick={() => handleEdit(activity)}>Edit</button>
    <button onClick={() => handleDelete(activity.id)}>Delete</button>
</li>
))}
</ul>

</div>
);
};

export default InstitutionDashboard;
