import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { ContextUser } from '../Context/Context';

import {
    jobLevels, educationLevels,
    empoymentTypes, experinceLevel,
    jobCategories
} from "../constant/job";
import '../css/add-jobs.css'

export default function PostJobs() {
    const {userData} = React.useContext(ContextUser);
    const token = userData.token;
    const navigate = useNavigate();

    let [jobData, setJobData] = useState({
        job_name: "",
        job_category: "",
        job_level: "",
        no_of_vacancy: "",
        employment_type: "",
        job_location: {
            street_address: "",
            city: ""
        },
        offered_salary: "",
        application_dead_line: "",
        education_level: "",
        experience_level: "",
        skills_required: [],
        other_specification: [],
        job_description: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (["street_address", "city"].includes(name)) {
            setJobData((prev) => ({
                ...prev,
                job_location: {
                    ...prev.job_location,
                    [name]: value
                }
            }
            ));
        }
        else {
            setJobData({
                ...jobData,
                [name]: value
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = { ...jobData };
        data["skills_required"] = data.skills_required.length > 0 ? data.skills_required.split(",") : [];
        data["job_description"] = data.job_description.length > 0 ? data.job_description.split(".") : [];
        data["other_specification"] = data.other_specification.length > 0 ? data.other_specification.split(".") : [];
        data["job_location"] = JSON.stringify(data.job_location);

        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/employer/job/post`,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : token}`
            }
        }).then((res) => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <form className='mb-3 mt-3' onSubmit={handleSubmit} style={{width: "100vw"}}>
                <div className='row d-flex justify-content-center'>
                    <div className='mb-3 form-format'>
                        <label for="job_name" className="form-label"> Job Name </label>
                        <input className="form-control" type="text" name="job_name" placeholder='Job Name'
                            value={jobData.job_name} onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="job_category" className="form-label"> Job category </label>
                        <select className="form-select col-4" aria-label="Default select example" name="job_category" onChange={handleChange}>
                            <option selected>Select the Job category </option>
                            {
                                jobCategories.map((job) => (
                                    <option value={job.value}>{job.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="job_level" className="form-label"> Job Level </label>
                        <select className="form-select col-4" aria-label="Default select example" name="job_level" onChange={handleChange}>
                            <option selected>Select the Experience level</option>
                            {
                                jobLevels.map((job) => (
                                    <option value={job.value}>{job.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="no_of_vacancy" className="form-label"> Number of Vacancies </label>
                        <input className="form-control" type="text" name="no_of_vacancy" placeholder='number of vacancies'
                            value={jobData.no_of_vacancy} onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="employment_type" className="form-label"> Employment Type </label>
                        <select className="form-select col-4" aria-label="Default select example" name="employment_type" onChange={handleChange}>
                            <option selected>Select the Employment type</option>
                            {
                                empoymentTypes.map((type) => (
                                    <option value={type.value}>{type.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="job_location" className="form-label"> Job Location </label>
                        <div className='mb-3'>
                            <label for="street_address" className="form-label"> Street Address </label>
                            <input className="form-control" type="text" name="street_address" placeholder='street address'
                                value={jobData.job_location.street_address} onChange={handleChange} />
                        </div>
                        <div className='mb-3 form-format'>
                            <label for="city" className="form-label"> City </label>
                            <input className="form-control" type="text" name="city" placeholder='city'
                                value={jobData.job_location.city} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='mb-3 form-format' >
                        <label for="offered_salary" className="form-label"> Offered salary </label>
                        <input className="form-control" type="text" name="offered_salary" placeholder='20,000 or negotiable'
                            value={jobData.offered_salary} onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="application_dead_line" className="form-label"> Application Dead Line </label>
                        <input className="form-control" type="date" name="application_dead_line"
                            value={jobData.application_dead_line} onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="education_level" className="form-label"> Education Level </label>
                        <select className="form-select col-4" aria-label="Default select example" name="education_level" onChange={handleChange}>
                            <option selected>Select the Education level</option>
                            {
                                educationLevels.map((edu) => (
                                    <option value={edu.value}>{edu.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="experience_level" className="form-label"> Experience Level </label>
                        <select className="form-select col-4" aria-label="Default select example" name="experience_level" onChange={handleChange}>
                            <option selected>Select the Experience level</option>
                            {
                                experinceLevel.map((exp) => (
                                    <option value={exp.value}>{exp.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="skills_required" className="form-label"> Skills Required </label>
                        <input className="form-control" type="text" name="skills_required"
                            value={jobData.skills_required} onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="other_specification" className="form-label"> Other Specification </label>
                        <textarea className="form-control" name="other_specification"
                            onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format'>
                        <label for="job_description" className="form-label"> Job Description </label>
                        <br />
                        <textarea className="form-control" name="job_description" onChange={handleChange} />
                    </div>
                    <div className='mb-3 form-format'>
                        <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}
