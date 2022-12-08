import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function UpdateApplicantProfile() {
    const profile = useSelector((state) => state.profile.profile)
    let [updatedData, setUpdatedData] = useState({
        profile_pic : [],
        resume: []
    })

    useEffect(() => {
        updatedData["level"] = profile.level
        updatedData["skills"] = profile.skills.join(" , ")
        updatedData["experience"] = profile.experience
        updatedData["date_of_birth"] = profile.date_of_birth
        updatedData["gender"] = profile.gender
        updatedData["condition"] = profile.expected_salary.condition
        updatedData["amount"] = profile.expected_salary.amount
        updatedData["street"] = profile.current_address.street
        updatedData["city"] = profile.current_address.city
        updatedData["province"] = profile.current_address.province
        updatedData["job_location"] = profile.job_location.join(" , ")
    }, [])
    function handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData()
        formData["expected_salary"] = {}
        formData["current_address"] = {}
        formData["level"] = updatedData["level"]
        formData["skills"] = updatedData["skills"].split(",")
        formData["experience"] = updatedData["experience"]
        formData["date_of_birth"] = updatedData["date_of_birth"]
        formData["gender"] = updatedData["gender"]
        formData["expected_salary"]["amount"] = updatedData["amount"]
        formData["expected_salary"]["condition"] = updatedData["condition"]
        formData["current_address"]["street"] = updatedData["street"]
        formData["current_address"]["city"] = updatedData["city"]
        formData["current_address"]["province"] = updatedData["province"]
        formData["job_location"] = updatedData["job_location"]
        let profile_pic = updatedData["profile_pic"]
        let profile_pic_arr = [...profile_pic]
        let resume= updatedData["resume"]
        let resume_arr = [...resume]
        profile_pic_arr.forEach(el => {
            formData.append("profile_pic", el)
        })
        resume_arr.forEach(el => {
            formData.append("resume", el)
        })
        axios.put(`${process.env.REACT_APP_SERVER_URL}/applicant/profile/update`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }).then((res => {
            console.log(res)
          })).catch((err)=> {
            console.log(err)
          })
    }

    function handleChange(e) {
        let { name, value } = e.target
        if (e.target.type === "file") {
            setUpdatedData({
                ...updatedData,
                [name]: e.target.files
            })
        }
        else {
            setUpdatedData({
                ...updatedData,
                [name]: value
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="formFileSm" class="form-label">Experience Level</label>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        name="level"
                        value={updatedData.level} onChange={handleChange}
                        placeholder="eg: entry" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Skills</label>
                    <input type="text" className="form-control"
                        name="skills"
                        value={updatedData.skills} onChange={handleChange}
                        placeholder="eg: python, C" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Years of Experience</label>
                    <input type="text" className="form-control"
                        name="experience"
                        value={updatedData.experience} onChange={handleChange}
                        placeholder="eg: 1" />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">date of Birth</label>
                    <input type="date" className="form-control"
                        name="date_of_birth"
                        value={updatedData.date_of_birth} onChange={handleChange}
                        placeholder="MM/DD/YYYY" />
                </div>
                <div className="mb-3">
                    <select class="form-select" name="gender" aria-label="Default select example" onChange={handleChange}>
                        <option value="male" selected={updatedData.gender === "male" ? "selected" : ""}>Male</option>
                        <option value="female" selected={updatedData.gender === "female" ? "selected" : ""}>Female</option>
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
                                <option value="equal" selected={updatedData.condition === "equal" ? "selected" : ""}>equal</option>
                                <option value="greater" selected={updatedData.condition === "greater" ? "selected" : ""}>greater</option>
                                <option value="lesser" selected={updatedData.condition === "lesser" ? "selected" : ""}>lesser</option>
                            </select>
                        </div>
                        <div class="col-9">
                            <input type="text" class="form-control" name="amount"
                                value={updatedData.amount} onChange={handleChange} placeholder="Amount in Rs" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Street Name </label>
                            <input type="text" class="form-control" name="street" onChange={handleChange}
                                value={updatedData.street} placeholder="eg. Hanuman Chowk" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> City </label>
                            <input type="text" class="form-control" name="city" onChange={handleChange}
                                value={updatedData.city} placeholder="eg. biratnagar" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Province </label>
                            <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
                                <option value="province no 1" selected={updatedData.province === "province no 1" ? "selected" : ""}>Province No 1</option>
                                <option value="bagmati" selected={updatedData.province === "bagmati" ? "selected" : ""}>Bagmati</option>
                                <option value="madhesh" selected={updatedData.province === "madhesh" ? "selected" : ""}>Madhesh</option>
                                <option value="lumbini" selected={updatedData.province === "lumbini" ? "selected" : ""}>Lumbini</option>
                                <option value="gandaki" selected={updatedData.province === "gandaki" ? "selected" : ""}>Gandaki</option>
                                <option value="karnali" selected={updatedData.province === "karnali" ? "selected" : ""}>Karnali</option>
                                <option value="sudur paschim" selected={updatedData.province === "sudur paschim" ? "selected" : ""}>Sudur Paschim</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="current-address" class="form-label"> Prefered Job location </label>
                    <input type="text" className="form-control"
                        name="job_location"
                        value={updatedData.job_location} onChange={handleChange}
                        placeholder="eg: biratnagar, morang" />
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
