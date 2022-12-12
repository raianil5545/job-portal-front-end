import React from 'react';
import { useContext } from 'react';
import jobContext from '../Context/jobcontext';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';


function ShowJobs(props) {
    const jobs = useContext(jobContext)
    const navigate = useNavigate()
    const handleOnClick = (index) => {
        navigate(`/job/show/${jobs[index]._id}`, {state:{job:jobs[index], logo: props.logo}})
    }
    return (
        <>
            <div className='row' id="one">
                {
                    jobs.map((job, index) => {
                        return <div className='col-md-4 mb-3 mx-auto' onClick={() => handleOnClick(index)} style={{"cursor": "pointer"}}>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <p> Job name: {job.job_name} </p>
                                <img className="d-block w-100" src={"http://localhost:8000/" + props.logo} alt="" />
                            </div>
                        </div>
                    })
                }

            </div>
        </>
    )
}

export default memo(ShowJobs);
