import React from 'react';
import './InstitutionSignUpandLogin.css';

const InstitutionDashboard = () => {
return (
<div className="institution-container">
    <header className="institution-header">
    <h1>Institution Dashboard</h1>
    </header>

    <section className="activity-posting">
    <h2>Post a New Activity</h2>
    {/* Form to post a new activity */}
    {/* ... */}
    </section>

    <section className="activity-management">
    <h2>Manage Activities</h2>
    {/* Table or list to manage activities */}
    {/* ... */}
    </section>

    <section className="analytics-overview">
    <h2>Analytics Overview</h2>
    {/* Analytics and insights */}
    {/* ... */}
    </section>
</div>
);
};

export default InstitutionDashboard;
