import React from 'react';
import '../css/style.css';


function ApplicantProfile({profile}) {

  return (
    <div className='container-fluid job-body'>
      <p><span id="job-item-topic">Experience: </span> <span id="job-item-content">{profile.experience} year</span></p>
      <p><span id="job-item-topic">Gender: </span> <span id="job-item-content">{profile.gender}</span></p>
      <p><span id="job-item-topic">Date of Birth: </span> <span id="job-item-content">{profile.date_of_birth}</span></p>
      <p><span id="job-item-topic">Job Level: </span> <span id="job-item-content">{profile.level}</span></p>
      <p><span id="job-item-topic">Profile Pic:</span></p>
            <img className='jobs-logo' src={"http://localhost:8000/" + profile.profile_pic} alt="profile pic" width="500" height="600" />
      <p><span id="job-item-topic">Resume: </span> <span id="job-item-content"><a href={"http://localhost:8000/" + profile.resume}>resume link</a></span></p>
      <p><span id="job-item-topic">Street: </span> <span id="job-item-content">{profile.current_address.street}</span></p>
      <p><span id="job-item-topic">city: </span> <span id="job-item-content">{profile.current_address.city}</span></p>
      <p><span id="job-item-topic">Province: </span> <span id="job-item-content">{profile.current_address.province}</span></p>
      <p><span id="job-item-topic">Expected Salary: </span> <span id="job-item-content">Rs {profile.expected_salary.amount}</span></p>
      <p><span id="job-item-topic">Prefered Job location: </span> <span id="job-item-content">{profile.job_location.join(" , ")}</span></p>
      <p><span id="job-item-topic">Skills: </span> <span id="job-item-content">{profile.skills.join(" , ")}</span></p>
    </div>
  );
}

export default ApplicantProfile;