import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateApplicantProfile() {
    let navigate = useNavigate()
    let [profileData, setProfileData] = useState({
        level: "",
        skills: "",
        experience: "",
        date_of_birth: "",
        gender: "",
        expected_salary: {
            condition: "",
            amount: "",
        },
        profile_pic: [],
        resume: [],
        current_address: {
            street: "",
            city: "",
            province: ""
        },
        job_location:""
    })

    let handleChange = (event) => {
        let {name, value} = event.target
        if (event.target.type === "file"){
            setProfileData({
                ...profileData,
                [name]: event.target.files
            })
        }
        else {
            setProfileData({
                ...profileData,
                [name]: value
            })
        }
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        let formData = new FormData()
        let { level, skills, experience, 
            date_of_birth, gender,
            expected_salary, profile_pic, 
            resume, current_address, 
            job_location } = profileData
        
        
        formData.append("level", level);
        formData.append("skills", skills);
        formData.append("experience", experience);
        formData.append("date_of_birth", date_of_birth);
        formData.append("gender", gender);
        formData.append("expected_salary", expected_salary);
        let profile_pic_arr = [...profile_pic]
        profile_pic_arr.forEach(
            el => {
                formData.append("profile_pic", el);
            }
        )
        let resume_arr = [...resume]
        resume_arr.forEach(
            el => {
                formData.append("resume", el);
            }
        )
        formData.append("current_address", current_address);
        formData.append("job_location", job_location);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/applicant/profile/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(
            (res) => {
                console.log(res)
                navigate("/")
            }
        ).catch(
            (err) => {
                navigate("/applicant/profile/create")
                alert("caught error: ", err)
            }
        )
    }

  return (
    <>
            <form onSubmit={handleSubmit}>
                <label for="formFileSm" class="form-label">Experience Level</label>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        name="level"
                        value={profileData.level} onChange={handleChange}
                        placeholder="eg: entry" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Skills</label>
                    <input type="text" className="form-control"
                        name="skills"
                        value={profileData.skills} onChange={handleChange}
                        placeholder="eg: python, C" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Years of Experience</label>
                    <input type="text" className="form-control"
                        name="experience"
                        value={profileData.experience} onChange={handleChange}
                        placeholder="eg: 1" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">date of Birth</label>
                    <input type="date" className="form-control"
                        name="date_of_birth"
                        value={profileData.date_of_birth} onChange={handleChange}
                        placeholder="MM/DD/YYYY" />
                </div>
                <div className="mb-3">
                    <select class="form-select" name="gender" aria-label="Default select example" onChange={handleChange}>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="formFileSm" class="form-label">Upload your Profile Pic Here</label>
                    <input class="form-control form-control-sm" name="profile_pic"
                        type="file" onChange={handleChange} />
                </div>
                <div class="mb-3">
                    <label for="formFileSm" class="form-label">Upload your Resume Here</label>
                    <input class="form-control form-control-sm" name="resume" type="file" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="expected-salary" class="form-label"> Expected Salary </label>
                    <div className="row">
                        <div class="col-3">
                            <select class="form-select col-4" name="condition" aria-label="Default select example" onChange={handleChange}>
                                <option value="equal">equal</option>
                                <option value="greater">greater</option>
                                <option value="lesser">lesser</option>
                            </select>
                        </div>
                        <div class="col-9">
                            <input type="text" class="form-control" name="amount"
                                value={profileData.amount} onChange={handleChange} placeholder="Amount in Rs" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Street Name </label>
                            <input type="text" class="form-control" name="street" onChange={handleChange}
                                value={profileData.street} placeholder="eg. Hanuman Chowk" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> City </label>
                            <input type="text" class="form-control" name="city" onChange={handleChange}
                                value={profileData.city} placeholder="eg. biratnagar" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Province </label>
                            <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
                                <option value="province no 1">Province No 1</option>
                                <option value="bagmati">Bagmati</option>
                                <option value="madhesh">Madhesh</option>
                                <option value="lumbini">Lumbini</option>
                                <option value="gandaki">Gandaki</option>
                                <option value="karnali">Karnali</option>
                                <option value="sudur paschim">Sudur Paschim</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="current-address" class="form-label"> Prefered Job location </label>
                    <input type="text" className="form-control"
                        name="job_location"
                        value={profileData.job_location} onChange={handleChange}
                        placeholder="eg: biratnagar, morang" />
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
  )
}
