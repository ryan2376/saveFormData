import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 0,
    lng: 0,
};

const InstitutionSignUp = () => {
    const [institutionDetails, setInstitutionDetails] = useState({
        name: '',
        location: '',
        activities: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        username: '',
        password: '',
        latitude: null,
        longitude: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstitutionDetails({
            ...institutionDetails,
            [name]: value,
        });
    };

    const handleMapClick = (e) => {
        setInstitutionDetails({
            ...institutionDetails,
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
        });
    };

    const handlePlacesChanged = (searchBoxRef) => {
        const searchBox = searchBoxRef.current;
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places.length > 0) {
                const { formatted_address, geometry } = places[0];
                const { lat, lng } = geometry.location;

                setInstitutionDetails({
                    ...institutionDetails,
                    location: formatted_address,
                    latitude: lat(),
                    longitude: lng(),
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/saveFormData/backend/saveInstitutionData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(institutionDetails),
            });

            if (response.ok) {
                console.log('Institution data submitted successfully');
                window.location.href = '/institution-login';
            } else {
                console.error('Institution data submission failed');
            }
        } catch (error) {
            console.error('An error occurred during institution data submission:', error);
        }
    };

    const searchBoxRef = useRef(null);

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
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={10}
                                center={center}
                                onClick={handleMapClick}
                            >
                                <StandaloneSearchBox
                                    onLoad={(ref) => {
                                        searchBoxRef.current = ref;
                                        console.log('SearchBox loaded:', ref);
                                    }}
                                    onPlacesChanged={() => handlePlacesChanged(searchBoxRef)}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter your location"
                                        style={{
                                            boxSizing: 'border-box',
                                            border: '1px solid transparent',
                                            width: '240px',
                                            height: '32px',
                                            padding: '0 12px',
                                            borderRadius: '3px',
                                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                            fontSize: '14px',
                                            outline: 'none',
                                            textOverflow: 'ellipses',
                                            position: 'absolute',
                                            left: '50%',
                                            marginLeft: '-120px',
                                        }}
                                    />
                                </StandaloneSearchBox>
                            </GoogleMap>
                        </LoadScript>
                    </label>

                    <label>
                        Latitude:
                        <input
                            type="text"
                            name="latitude"
                            value={institutionDetails.latitude || ''}
                            onChange={handleInputChange}
                            disabled
                        />
                    </label>

                    <label>
                        Longitude:
                        <input
                            type="text"
                            name="longitude"
                            value={institutionDetails.longitude || ''}
                            onChange={handleInputChange}
                            disabled
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
