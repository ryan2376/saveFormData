import React, { useEffect } from 'react';

const DebugComponent = () => {
    useEffect(() => {
        // This will log the API key when the component mounts
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
    }, []);

    // You can also place it here, outside the return statement
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    return (
        <div>
            {/* Your component JSX */}
            
        </div>
    );
};

export default DebugComponent;
