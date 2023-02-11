import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextUser } from '../Context/Context';
import '../css/style.css';


export default function ShowJob() {
  const {userData} = React.useContext(ContextUser)
  const location = useLocation();
  const logo = location.state.logo;
  const job = location.state.job;
  const navigate = useNavigate();
  let dateNow =  Date.now();
  const applicantDate = new Date(job.application_dead_line);
  let timeRemaining = applicantDate - dateNow;

  const updateJobs = (job) => {
    navigate(`/employer/job/update/${job._id}`, { state: { job: job } });
  };

  const deleteJob = (job) => {
    navigate(`/employer/job/delete/${job._id}`)
  };
  
  const applyJob = () => {
    navigate(`/jobseeker/job/apply/${job._id}`, {state: {job: job} })
  }

  return (
    <div className='container-fluid mb-3'>
      <img className="d-block"  style = {{width: "10rem", height: "10rem"}} src={"http://localhost:8000/" + (logo?logo:job.logo)} alt="" />
      <div className='job-header'>
        <h4><strong>{job.job_name}</strong></h4>
        <h6><strong>Basic Job Information</strong></h6>
      </div>
      <div className='job-body'>
        <p><span id="job-item-topic">Job category:</span> <span id="job-item-content">{job.job_category}</span></p>
        <p><span id="job-item-topic">Job Level: </span> <span id="job-item-content">{job.job_level}</span></p>
        <p><span id="job-item-topic">No. of Vacancy/s: </span>[<span id="job-item-content">{job.no_of_vacancy}</span>]</p>
        <p><span id="job-item-topic">Employment Type: </span><span id="job-item-content">{job.employment_type}</span></p>
        <p><span id="job-item-topic">Job Location: </span><span id="job-item-content">{`${job.job_location.street_address}, ${job.job_location.city}`}</span></p>
        <p><span id="job-item-topic">Offered Salary: </span><span id="job-item-content">{job.offered_salary}</span></p>
        <p><strong><span id="job-item-topic">Job Specification: </span></strong></p>
        <p><span id="job-item-topic">Education Level: </span><span id="job-item-content">{job.education_level}</span></p>
        <p><span id="job-item-topic">Applicantion Deadline: </span><span id="job-item-content">{job.application_dead_line}</span></p>
        <p><span id="job-item-topic">Other Specifications: </span>
          {
            job.other_specification.map((el) => {
              return <ul>
                {
                  el !== ""? <li><span id="job-item-content">{el}.</span></li>:""
                }
              </ul>
            })
          }

        </p>
        <p><span id="job-item-topic">Skills Required: </span ><span id="job-item-content">{job.skills_required.join(" , ")}</span></p>
        <p>
        <span id="job-item-topic">Job Description:</span>
          {
            job.job_description.map((el) => {
              return (
                <ul>
                {
                  el !== ""? <li><span id="job-item-content">{el}.</span></li>:""
                }
              </ul> )
          })
          }
        </p>
      </div>
      {
        userData.user.id === job.employer_id ? <button onClick={() => updateJobs(job)}
         type="submit" style={{ width: '25%' }}
         className="btn btn-primary mx-3 my-3">Update Job</button>: ""
      }
      {
        userData.user.id === job.employer_id ? <button onClick={() => deleteJob(job)}
         type="submit" style={{ width: '25%' }}
         className="btn btn-primary">Delete Job</button>: ""
      }
      {
        userData.user.role === "applicant" ? <button onClick={() => applyJob(job)}
         type="submit" style={{ width: '25%' }}
         className="btn btn-primary" disabled={timeRemaining > 0 ? false: true}>Apply</button>: ""
      }
      
    </div>
  );
}
