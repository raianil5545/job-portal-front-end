import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function ShowJob() {
  const user = useSelector((state) => (state.auth.user));
  const location = useLocation();
  const logo = location.state.logo;
  const job = location.state.job;
  const navigate = useNavigate();

  const updateJobs = (job) => {
    navigate(`/employer/job/update/${job._id}`, { state: { job: job } });
  };

  return (
    <div className='container-fluid mb-3'>
      <p> Job name: {job.job_name} </p>
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
      {
        user.role === "employer" &&
        <button onClick={() => updateJobs(job)} type="submit" style={{ width: '50%' }} className="btn btn-primary">Update Jobs</button>
      }
    </div>
  );
}
