import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapTest = () => {
const mapContainerStyle = {
width: '800px',
height: '600px'
};

const center = {
lat: -0.16653393748361453,
lng: 35.96483838928074
};

return (
<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={center}
    zoom={10}
    >
    {/* You can place additional map features here */}
    </GoogleMap>
</LoadScript>
);
};

export default MapTest;
