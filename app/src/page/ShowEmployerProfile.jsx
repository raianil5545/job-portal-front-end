import React from 'react';
import { useSelector } from 'react-redux';

export default function ShowEmployerProfile() {
    const profile = useSelector((state) => (state.profile.profile));

    return (
        <div>
            Profile Pic:
            < br />
            <img src={"http://localhost:8000/" + profile.logo} alt="company logo" width="500" height="600" />
            <br />
            <p>Founded Year: {profile.founded_year}</p>
            <p>Website: {profile.website_url}</p>
           HeadQuarter Address:
           <br/>
           <address>Street: {profile.headquarter_address.street}</address>
           <address>City: {profile.headquarter_address.city}</address>
           <address>Province: {profile.headquarter_address.province}</address>
           <address>Location: {profile.locations.join(" , ")}</address>
        </div>
    );
};
