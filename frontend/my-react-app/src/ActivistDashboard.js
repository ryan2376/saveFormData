import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './ActivistDashboard.css';

const ActivistDashboard = () => {
    const [activistInfo, setActivistInfo] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        interests: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // State for chatbot
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    // State for institution search
    const [searchLocation, setSearchLocation] = useState('');
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    useEffect(() => {
        const activistId = localStorage.getItem('activistId');
        if (activistId) {
            axios.get(`http://localhost/saveFormData/backend/activistDashboard.php?id=${activistId}`)
                .then(response => {
                    setActivistInfo(response.data);
                })
                .catch(error => console.error('Error fetching activist profile:', error));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivistInfo({
            ...activistInfo,
            [name]: value
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost/saveFormData/backend/activistDashboard.php${activistInfo.id ? `?id=${activistInfo.id}` : ''}`;
        axios({
            method: activistInfo.id ? 'PUT' : 'POST',
            url: url,
            data: activistInfo,
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (!activistInfo.id) {
                    localStorage.setItem('activistId', response.data.id);
                }
                setIsEditing(false);
                alert('Profile updated successfully');
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    // Chatbot functionality
    const handleChatInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleQuerySubmit = async () => {
        const data = {
            prompt: userInput,
            max_tokens: 150,
            temperature: 0.7
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', data, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                }
            });

            setChatHistory([...chatHistory, { user: userInput, bot: response.data.choices[0].text }]);
            setUserInput('');
        } catch (error) {
            console.error('Error in sending message to OpenAI:', error);
        }
    };

    const handleLocationSearch = async () => {
        try {
            const response = await axios.get(`http://localhost/api/searchInstitutions.php?location=${searchLocation}`);
            setInstitutions(response.data);
        } catch (error) {
            console.error('Error fetching institutions:', error);
        }
    };

    return (
        <div className="activist-dashboard">
            <h1>Activist Dashboard</h1>

            {/* Profile Section */}
            <section className="activist-profile">
                <h2>Profile</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="firstName" value={activistInfo.firstName} onChange={handleInputChange} placeholder="First Name" required />
                        <input type="text" name="lastName" value={activistInfo.lastName} onChange={handleInputChange} placeholder="Last Name" required />
                        <input type="email" name="email" value={activistInfo.email} onChange={handleInputChange} placeholder="Email" required />
                        <input type="text" name="phoneNumber" value={activistInfo.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required />
                        <input type="text" name="location" value={activistInfo.location} onChange={handleInputChange} placeholder="Location" required />
                        <input type="text" name="interests" value={activistInfo.interests} onChange={handleInputChange} placeholder="Interests" required />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleEditToggle}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p>First Name: {activistInfo.firstName}</p>
                        <p>Last Name: {activistInfo.lastName}</p>
                        <p>Email: {activistInfo.email}</p>
                        <p>Phone Number: {activistInfo.phoneNumber}</p>
                        <p>Location: {activistInfo.location}</p>
                        <p>Interests: {activistInfo.interests}</p>
                        <button onClick={handleEditToggle}>Edit Profile</button>
                    </div>
                )}
            </section>

            {/* Chatbot Interface */}
            <div className="chatbot-container">
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {chat.user}</p>
                        <p><strong>Bot:</strong> {chat.bot}</p>
                    </div>
                ))}
                <input type="text" value={userInput} onChange={handleChatInputChange} placeholder="Ask a question" />
                <button onClick={handleQuerySubmit}>Send</button>
            </div>

            {/* Institution Search */}
            <div className="institution-search">
                <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Enter location..."
                />
                <button onClick={handleLocationSearch}>Search</button>

                <MapContainer center={[0, 0]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {institutions.map((institution) => (
                        <Marker
                            key={institution.id}
                            position={[institution.latitude, institution.longitude]}
                            onClick={() => {
                                setSelectedInstitution(institution);
                            }}
                        />
                    ))}

                    {selectedInstitution && (
                        <Popup
                            position={[
                                selectedInstitution.latitude,
                                selectedInstitution.longitude,
                            ]}
                            onClose={() => {
                                setSelectedInstitution(null);
                            }}
                        >
                            <div>
                                <h2>{selectedInstitution.name}</h2>
                                <p>{selectedInstitution.description}</p>
                            </div>
                        </Popup>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default ActivistDashboard;
