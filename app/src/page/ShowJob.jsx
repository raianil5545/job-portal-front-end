import React from 'react';
import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function ShowJob() {
    let { id } = useParams();
    const location = useLocation()
    const logo = location.state.logo
    const job = location.state.job
  return (
    <div className='container-fluid'>
        <p> Job name: {job.name} </p>
        <img className="d-block w-100" src={"http://localhost:8000/" + logo} alt="" />
        <p>Job category: {job.job_category}</p>
        <p>Job Level: {job.job_level}</p>
        <p>No. of Vacancy/s: {job.no_of_vacancy}</p>
        <p>Employment Type: {job.employment_type}</p>
        <p>Job Location: {`${job.job_location.street_address}, ${job.job_location.city}`}</p>
        <p>Offered Salary: {job.offered_salary}</p>
        <p>Other Specification: {job.other_specification[0]}</p>
        <p>Skills Required: {job.skills_required.join(" , ")}</p>
        <p>Job Description: {job.job_description[0]}</p>
    </div>
  )
}
