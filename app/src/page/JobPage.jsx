import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import '../css/style.css';


export default function JobPage({ currentItems, logo }) {
    const navigate = useNavigate();
    const handleOnClick = (index) => {
        navigate(`/job/show/${currentItems[index]._id}`, { state: { job: currentItems[index], logo: logo } });
    }

    let [timeRem, setTimeRem] = useState([])

    let applicant_deadline_arr = []
    if (currentItems) {
        applicant_deadline_arr = currentItems.map((el) => {
            return el.application_dead_line
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            let time_remaining = []
            let time_now = Date.now();
            for (let i = 0; i < applicant_deadline_arr.length; i++) {
                let applicant_deadline = new Date(applicant_deadline_arr[i])
                let time_ream = applicant_deadline - time_now
                let days = Math.floor(time_ream / 86400000)
                let hours = Math.floor((time_ream % 86400000) / 3600000)
                let mins = Math.round(((time_ream % 86400000) % 3600000) / 60000)
                time_remaining.push(`${days} days:${hours} hours:${mins} mins`)
            }
            setTimeRem(time_remaining)
        }, 1000);
        return () => clearInterval(interval);
    }, [timeRem])

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        currentItems &&
                        currentItems.map((job, index) => {
                            return (<div className='col-md-4 jobs' onClick={() => handleOnClick(index)} style={{ "cursor": "pointer" }}>
                                <Card style={{ width: '18rem', height: '15rem' }}>
                                    <Card.Img className='jobs-logo' variant="top" src={"http://localhost:8000/" + (job.logo ? job.logo : logo)} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "18px" }}>{job.job_name}</Card.Title>
                                        <Card.Text>
                                            {
                                                timeRem[index]?.length > 0 &&
                                                <span id="job-item-content" style={timeRem[index]?.length > 0 ? { color: 'green' } :
                                                { color: 'red' }}>{timeRem[index]?.length > 0 ? `Time Left: ${timeRem[index]}` : "Job Expired"}</span>
                                            }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>)
                        })
                    }

                </div>

            </div>
        </>
    );
}
