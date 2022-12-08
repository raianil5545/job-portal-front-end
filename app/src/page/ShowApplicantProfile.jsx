import React from 'react';
import { useSelector } from 'react-redux';


function ShowApplicantProfile() {

  let profile = useSelector((state) => state.profile.profile)

  return (

            <div>
                <p>Experience: {profile.experience} year</p>
                <p>Gender: {profile.gender}</p>
                <p>Date of Birth: {profile.date_of_birth}</p>
                <p>Job Level: {profile.level}</p>
                Profile Pic: 
                < br/>
                <img src={"http://localhost:8000/" + profile.profile_pic} width="500" height="600"/>
                <p>Resume: <a href={"http://localhost:8000/" + profile.resume}>resume link</a></p>
                <p>city: {profile.current_address.city}</p>
                <p>Province: {profile.current_address.province}</p>
                <p>Street: {profile.current_address.street}</p>
                <p>Expected Salary: Rs {profile.expected_salary.amount}</p>
                <p>Prefered Job location: {profile.job_location.join(" , ")}</p>
                <p>Skills: {profile.skills.join(" , ")}</p>
            </div>
  )
}

export default ShowApplicantProfile;
