import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ContextUser } from '../Context/Context';


export default function UpdateApplicantProfile({profile}) {
    const {userData} = React.useContext(ContextUser)
    const reduxAccessToken = userData?.token;
    const navigate = useNavigate();

    let [updatedData, setUpdatedData] = useState({
        profile_pic: [],
        resume: [],
        level: profile.level,
        skills: profile.skills.join(" , "),
        experience: profile.experience,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        expected_salary: profile.expected_salary,
        current_address: profile.current_address,
        job_location: profile.job_location.join(" , ")
    });

    function handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        if (profile.level !== updatedData.level) {
            formData.append("level", updatedData["level"]);
        }
        if ((profile.skills.join(" , ") !== updatedData.skills)) {
            let skills_arr = updatedData.skills.split(",");
            skills_arr.forEach(el => {
                formData.append("skills[]", el);
            })
        }
        if (profile.experience !== updatedData.experience) {
            formData.append("experience", updatedData["experience"]);
        }
        if (profile.date_of_birth !== updatedData.date_of_birth) {
            formData.append("date_of_birth", updatedData["date_of_birth"]);
        }
        if (profile.gender !== updatedData.gender) {
            formData.append("gender", updatedData["gender"]);
        }
        if (profile.job_location.join(" , ") !== updatedData.job_location) {
            let locations_arr = updatedData.job_location.split(",");
            locations_arr.forEach(el => {
                formData.append("job_location[]", el);
            });
        }
        if (profile.expected_salary !== updatedData.expected_salary) {
            formData.append("expected_salary", JSON.stringify(updatedData["expected_salary"]));
        }
        if (profile.current_address !== updatedData.current_address) {
            formData.append("current_address", JSON.stringify(updatedData["current_address"]));
        }

        let profile_pic = updatedData["profile_pic"];
        let profile_pic_arr = [...profile_pic];
        let resume = updatedData["resume"];
        let resume_arr = [...resume];

        profile_pic_arr.forEach(el => {
            formData.append("profile_pic", el)
        });

        resume_arr.forEach(el => {
            formData.append("resume", el)
        });

        axios.put(`${process.env.REACT_APP_SERVER_URL}/applicant/profile/update`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : reduxAccessToken}`
            }
        }).then((res => {
            navigate("/");
        })).catch((err) => {
            console.log(err);
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (event.target.type === "file") {
            setUpdatedData({
                ...updatedData,
                [name]: event.target.files
            });
        }
        else {
            if (["condition", "amount"].includes(name)) {
                setUpdatedData((prevState) => ({
                    ...prevState,
                    expected_salary: {
                        ...prevState.expected_salary,
                        [name]: value
                    }
                }));
            }
            else if (["street", "city", "province"].includes(name)) {
                setUpdatedData((prevState) => ({
                    ...prevState,
                    current_address: {
                        ...prevState.current_address,
                        [name]: value
                    }
                }));
            }
            else {
                setUpdatedData({
                    ...updatedData,
                    [name]: value
                });
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="formFileSm" class="form-label">Experience Level</label>
                <div className="mb-3">
                    <select class="form-select col-4" name="level" aria-label="Default select example" onChange={handleChange}>
                        <option value="entry level" selected={updatedData.level === "entry level" ? "selected" : ""}>Entry Level</option>
                        <option value="mid level" selected={updatedData.level === "mid level" ? "selected" : ""}>Mid level</option>
                        <option value="senior level" selected={updatedData.level === "senior level" ? "selected" : ""}>Senior Level</option>
                        <option value="top level" selected={updatedData.level === "top level" ? "selected" : ""}>Top Level</option>
                    </select>
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
                                <option value="equal" selected={updatedData.expected_salary.condition === "equal" ? "selected" : ""}>equal</option>
                                <option value="greater" selected={updatedData.expected_salary.condition === "greater" ? "selected" : ""}>greater</option>
                                <option value="lesser" selected={updatedData.expected_salary.condition === "lesser" ? "selected" : ""}>lesser</option>
                            </select>
                        </div>
                        <div class="col-9">
                            <input type="text" class="form-control" name="amount"
                                value={updatedData.expected_salary.amount} onChange={handleChange} placeholder="Amount in Rs" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Street Name </label>
                            <input type="text" class="form-control" name="street" onChange={handleChange}
                                value={updatedData.current_address.street} placeholder="eg. Hanuman Chowk" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> City </label>
                            <input type="text" class="form-control" name="city" onChange={handleChange}
                                value={updatedData.current_address.city} placeholder="eg. biratnagar" />
                        </div>
                        <div class="col-4">
                            <label for="current-address" class="form-label"> Province </label>
                            <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
                                <option value="province no 1" selected={updatedData.current_address.province === "province no 1" ? "selected" : ""}>Province No 1</option>
                                <option value="bagmati" selected={updatedData.current_address.province === "bagmati" ? "selected" : ""}>Bagmati</option>
                                <option value="madhesh" selected={updatedData.current_address.province === "madhesh" ? "selected" : ""}>Madhesh</option>
                                <option value="lumbini" selected={updatedData.current_address.province === "lumbini" ? "selected" : ""}>Lumbini</option>
                                <option value="gandaki" selected={updatedData.current_address.province === "gandaki" ? "selected" : ""}>Gandaki</option>
                                <option value="karnali" selected={updatedData.current_address.province === "karnali" ? "selected" : ""}>Karnali</option>
                                <option value="sudur paschim" selected={updatedData.current_address.province === "sudur paschim" ? "selected" : ""}>Sudur Paschim</option>
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
    );
}
