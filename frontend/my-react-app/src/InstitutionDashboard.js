import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';
import './InstitutionDashboard.css';

const mapContainerStyle = {
width: '100%',
height: '400px'
};


const InstitutionDashboard = () => {
const [activities, setActivities] = useState([]);
const [form, setForm] = useState({ id: null, name: '', description: '', location: '', date: '' });
const [selectedLocation, setSelectedLocation] = useState(null);

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

const handlePlaceSelect = (place) => {
const location = {
    name: place.name,
    address: place.formatted_address,
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
};
setForm({ ...form, location });
setSelectedLocation(place);
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
    <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onPlaceSelected={handlePlaceSelect}
        options={{ types: ['geocode'], fields: ['name', 'formatted_address', 'geometry.location'] }}
        defaultValue={form.location}
        placeholder="Location"
        required
        />
    <input type="date" name="date" value={form.date} onChange={handleInputChange} required />
    <button type="submit">Submit</button>
    </form>
    <ul className="activities-list">
    {Array.isArray(activities) && activities.map(activity => (
        <li key={activity.id}>
        {activity.name} - {activity.date}
        <button onClick={() => handleEdit(activity)}>Edit</button>
        <button onClick={() => handleDelete(activity.id)}>Delete</button>
        </li>
    ))}
    </ul>
    {selectedLocation && (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div className="map-container">
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: selectedLocation.geometry.location.lat(), lng: selectedLocation.geometry.location.lng() }}
            zoom={10}
        >
            <Marker
            position={{ lat: selectedLocation.geometry.location.lat(), lng: selectedLocation.geometry.location.lng() }}
            />
        </GoogleMap>
        </div>
        </LoadScript>
    )}
</div>
);
};

export default InstitutionDashboard;

