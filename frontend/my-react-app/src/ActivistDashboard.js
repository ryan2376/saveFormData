import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ActivistDashboard.css';

const ActivistDashboard = () => {
  // State for activist profile
const [activistInfo, setActivistInfo] = useState({
firstName: '',
lastName: '',
email: '',
phoneNumber: '',
location: '',
interests: ''
});
const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

// State for chatbot
const [userInput, setUserInput] = useState('');
const [chatHistory, setChatHistory] = useState([]);

// Fetch activist's profile information
useEffect(() => {
// Placeholder data for demonstration
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

// Handle changes in input fields for activist profile
const handleInputChange = (e) => {
const { name, value } = e.target;
setActivistInfo(prevState => ({
    ...prevState,
    [name]: value
}));
};

// Toggle edit mode for activist profile
const handleEditToggle = () => {
setIsEditing(!isEditing);
};

// Handle submission of updated activist profile
const handleSubmit = (e) => {
e.preventDefault();
// Here you would send the updated data to the backend
console.log('Profile Updated:', activistInfo);
setIsEditing(false);
};

// Handle changes in input field for chatbot
const handleChatInputChange = (e) => {
setUserInput(e.target.value);
};

// Handle submission of query to chatbot
const handleQuerySubmit = async () => {
const data = {
    prompt: userInput,
    max_tokens: 150,
    temperature: 0.7
    // model: "gpt-3.5-turbo-instruct" // or use "text-instruct-davinci-beta" for InstructGPT
};

try {
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', data, {
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
    });

    setChatHistory([...chatHistory, { user: userInput, bot: response.data.choices[0].text }]);
    setUserInput(''); // Clear the input after sending
} catch (error) {
    console.error('Error in sending message to OpenAI:', error);
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

    {/* Chatbot Interface */}
    <div className="chatbot-container">
    {chatHistory.map((chat, index) => (
        <div key={index}>
        <p><strong>You:</strong> {chat.user}</p>
        <p><strong>Info AI:</strong> {chat.bot}</p>
        </div>
    ))}
    <input type="text" value={userInput} onChange={handleChatInputChange} />
    <button onClick={handleQuerySubmit}>Send</button>
    </div>
</div>
);
};

export default ActivistDashboard;
