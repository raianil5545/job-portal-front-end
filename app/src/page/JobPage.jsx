import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobPage({ currentItems, logo }) {
    console.log(logo)
    const navigate = useNavigate();
    const handleOnClick = (index) => {
        navigate(`/job/show/${currentItems[index]._id}`, { state: { job: currentItems[index], logo: logo } })
    }
    return (
        <>
            <div className='row' id="one">
                {
                    currentItems &&
                    currentItems.map((job, index) => {
                        return <div className='col-md-4 mb-3 mx-auto' onClick={() => handleOnClick(index)} style={{"cursor": "pointer"}}>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <p> Job name: {job.job_name} </p>
                                <img className="d-block w-100" src={"http://localhost:8000/" + logo} alt="" />
                            </div>
                        </div>
                    })
                }

            </div>
        </>
    )
}
