import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { jobLevels, educationLevels, empoymentTypes, experinceLevel, jobCategories } from "../constant/job"

export default function PostJobs() {
    const reduxAccessToken = useSelector((state) => (state.auth.token))
    const navigate = useNavigate()

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
        skills_required: "",
        other_specification: "",
        job_description: ""
    })
    const handleChange = (event) => {
        const { name, value } = event.target
        if (["street_address", "city"].includes(name)){
            setJobData((prev)=> ({
                ...prev,
                job_location: {
                    ...prev.job_location,
                    [name]: value
                }
            }
            ))
        }
        else {
            setJobData({
                ...jobData,
                [name]: value
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = {...jobData}
        data["skills_required"] = data.skills_required.split(",")
        data["job_description"] = data.job_description.split(". ")
        data["job_location"] = JSON.stringify(data.job_location)
        data["other_specification"] = data.other_specification.split(". ")
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/employer/job/post`,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : reduxAccessToken}`
            }
        }).then((res) => {
            console.log(res)
            navigate("/")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <form className='mb-3' onSubmit={handleSubmit}>
            <div className='mb-3'>
                    <label for="job_name" class="form-label"> Job Name </label>
                    <input className="form-control" type="text" name="job_name" placeholder='Job Name'
                        value={jobData.job_name} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="job_category" class="form-label"> Job category </label>
                    <select class="form-select col-4" aria-label="Default select example" name="job_category" onChange={handleChange}>
                        <option selected>Select the Job category </option>
                        {
                            jobCategories.map((job) => (
                                <option value={job.value}>{job.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    <label for="job_level" class="form-label"> Job Level </label>
                    <select class="form-select col-4" aria-label="Default select example" name="job_level" onChange={handleChange}>
                        <option selected>Select the Experience level</option>
                        {
                            jobLevels.map((job) => (
                                <option value={job.value}>{job.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    <label for="no_of_vacancy" class="form-label"> Number of Vacancies </label>
                    <input className="form-control" type="text" name="no_of_vacancy" placeholder='number of vacancies'
                        value={jobData.no_of_vacancy} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="employment_type" class="form-label"> Employment Type </label>
                    <select class="form-select col-4" aria-label="Default select example" name="employment_type" onChange={handleChange}>
                        <option selected>Select the Employment type</option>
                        {
                            empoymentTypes.map((type) => (
                                <option value={type.value}>{type.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-2'>
                    <label for="job_location" class="form-label"> Job Location </label>
                    <div className='mb-3'>
                        <label for="street_address" class="form-label"> Street Address </label>
                        <input className="form-control" type="text" name="street_address" placeholder='street address'
                            value={jobData.job_location.street_address} onChange={handleChange} />
                    </div>
                    <div className='mb-2'>
                        <label for="city" class="form-label"> City </label>
                        <input className="form-control" type="text" name="city" placeholder='city'
                            value={jobData.job_location.city} onChange={handleChange} />
                    </div>
                </div>
                <div className='mb-3'>
                    <label for="offered_salary" class="form-label"> Offered salary </label>
                    <input className="form-control" type="text" name="offered_salary" placeholder='20,000 or negotiable'
                        value={jobData.offered_salary} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="application_dead_line" class="form-label"> Application Dead Line </label>
                    <input className="form-control" type="date" name="application_dead_line"
                        value={jobData.application_dead_line} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="education_level" class="form-label"> Education Level </label>
                    <select class="form-select col-4" aria-label="Default select example" name="education_level" onChange={handleChange}>
                        <option selected>Select the Education level</option>
                        {
                            educationLevels.map((edu) => (
                                <option value={edu.value}>{edu.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    <label for="experience_level" class="form-label"> Experience Level </label>
                    <select class="form-select col-4" aria-label="Default select example" name="experience_level" onChange={handleChange}>
                        <option selected>Select the Experience level</option>
                        {
                            experinceLevel.map((exp) => (
                                <option value={exp.value}>{exp.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    <label for="skills_required" class="form-label"> Skills Required </label>
                    <input className="form-control" type="text" name="skills_required"
                        value={jobData.skills_required} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="other_specification" class="form-label"> Other Specification </label>
                        <textarea className="form-control" name="other_specification" 
                        onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="job_description" class="form-label"> Job Description </label>
                    <br />
                    <textarea className="form-control" name="job_description" onChange={handleChange} />
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
