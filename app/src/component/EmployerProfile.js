import React from 'react';

function EmployerProfile({ profile }) {
    return (
        <div className='container-fluid job-body'>
            <p><span id="job-item-topic">Company logo:</span></p>
            <img className='jobs-logo' src={"http://localhost:8000/" + profile.logo} alt="company logo" width="500" height="600" />
            <p><span id="job-item-topic">Founded Year: </span> <span id="job-item-content">{profile.founded_year}</span></p>
            <p><span id="job-item-topic">Website: </span> <span id="job-item-content">{profile.website_url}</span></p>
            <p><strong><span id="job-item-topic">HeadQuarter Address:</span></strong></p>
            <p><span id="job-item-topic">Street: </span> <span id="job-item-content">{profile.headquarter_address.street}</span></p>
            <p><span id="job-item-topic">City: </span> <span id="job-item-content">{profile.headquarter_address.city}</span></p>
            <p><span id="job-item-topic">Province: </span> <span id="job-item-content">{profile.headquarter_address.province}</span></p>
            <p><span id="job-item-topic">Location: </span> <span id="job-item-content">{profile.locations.join(" , ")}</span></p>
        </div>
    );
}

export default EmployerProfile;