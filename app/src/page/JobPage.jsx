import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';


export default function JobPage({ currentItems, logo }) {
    const navigate = useNavigate();
    const handleOnClick = (index) => {
        navigate(`/job/show/${currentItems[index]._id}`, { state: { job: currentItems[index], logo: logo } });
    }
    return (
        <>
            <div className='row' id="one">
                {
                    currentItems &&
                    currentItems.map((job, index) => {
                        const job_created = new Date(job.createdAt)
                        const applicantion_dealine = new Date(job.application_dead_line)
                        const time_remaining = applicantion_dealine - job_created
                        return <div className='col-md-4 jobs' onClick={() => handleOnClick(index)} style={{ "cursor": "pointer" }}>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <img className="d-block jobs-logo" src={"http://localhost:8000/" + (logo ? logo : job.logo)} alt="" />
                                <span>{job.job_name} </span>
                                <br />
                                <span id="job-item-content" style={time_remaining > 0 ? { color: 'green' } :
                                    { color: 'green' }}>{time_remaining > 0 ? `Time Left: 
                                    ${Math.floor(time_remaining / 86400000)}:
                                    ${Math.floor((time_remaining % 86400000) / 3600000)}:
                                    ${Math.round(((time_remaining % 86400000) % 3600000) / 60000)}` : "Job Expired"}</span>
                            </div>
                        </div>
                    })
                }

            </div>
        </>
    );
}
