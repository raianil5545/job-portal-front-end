import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorText from '../component/ErrorText';


export default function CreateApplicantProfile() {
    const navigate = useNavigate()
    const reduxAccessToken = useSelector((state) => (state.auth.token))
    let [profileData, setProfileData] = useState({
        level: "",
        skills: [],
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
        job_location: []
    });

    let [apiErrors, setApiCallErr] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.type === "file") {
            setProfileData({
                ...profileData,
                [name]: event.target.files
            });
        }
        else {
            if (["condition", "amount"].includes(name)) {
                setProfileData((prevState) => ({
                    ...prevState,
                    expected_salary: {
                        ...prevState.expected_salary,
                        [name]: value
                    }
                }));
            }
            else if (["street", "city", "province"].includes(name)) {
                setProfileData((prevState) => ({
                    ...prevState,
                    current_address: {
                        ...prevState.current_address,
                        [name]: value
                    }
                }));
            }
            else {
                setProfileData({
                    ...profileData,
                    [name]: value
                });
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let form_data = new FormData();
        let { level, skills, experience,
            date_of_birth, gender,
            expected_salary, profile_pic,
            resume, current_address,
            job_location } = profileData;

        form_data.append("level", level);
        form_data.append("skills", skills.split(","));
        form_data.append("experience", experience);
        form_data.append("date_of_birth", date_of_birth);
        form_data.append("gender", gender);
        form_data.append("current_address", JSON.stringify(current_address));
        form_data.append("expected_salary", JSON.stringify(expected_salary));

        let locations_arr = job_location.split(",");
        locations_arr.forEach(el => {
            form_data.append("job_location[]", el);
        });

        let skills_arr = skills.split(",");
        skills_arr.forEach(el => {
            form_data.append("skills[]", el);
        });

        let profile_pic_arr = [...profile_pic];
        profile_pic_arr.forEach(
            el => {
                form_data.append("profile_pic", el);
            }
        );

        let resume_arr = [...resume];
        resume_arr.forEach(
            el => {
                form_data.append("resume", el);
            }
        );

        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/applicant/profile/create`,
            data: form_data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : reduxAccessToken}`
            }
        }).then(
            (res) => {
                navigate("/");
            }
        ).catch(
            (err) => {
                setApiCallErr({});
                err?.response?.data?.errors?.forEach(el => {
                    setApiCallErr((prev) => {
                        return {
                            ...prev,
                            [el.param]: el.msg
                        }
                    });
                })
                navigate("/applicant/profile/create");
            }
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select class="form-select col-4" name="level" aria-label="Default select example" onChange={handleChange}>
                        <option selected>Select the Experience Level</option>
                        <option value="entry level">Entry Level</option>
                        <option value="mid level">Mid level</option>
                        <option value="senior level">Senior Level</option>
                        <option value="senior level level">Top Level</option>
                    </select>
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="level"
                        data={profileData} />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Skills</label>
                    <input type="text" className="form-control"
                        name="skills"
                        value={profileData.skills} onChange={handleChange}
                        placeholder="eg: python, C" />
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="skills"
                        data={profileData} />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">Years of Experience</label>
                    <input type="text" className="form-control"
                        name="experience"
                        value={profileData.experience} onChange={handleChange}
                        placeholder="eg: 1" />
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="experience"
                        data={profileData} />
                </div>
                <div className="mb-3">
                    <label for="formFileSm" class="form-label">date of Birth</label>
                    <input type="date" className="form-control"
                        name="date_of_birth"
                        value={profileData.date_of_birth} onChange={handleChange}
                        placeholder="MM/DD/YYYY" />
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="date"
                        data={profileData} />
                </div>
                <div className="mb-3">
                    <select class="form-select" name="gender" aria-label="Default select example" onChange={handleChange}>
                        <option selected>Select the Gender</option>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                    </select>
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="gender"
                        data={profileData} />
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
                                <option selected>Select the Salary condition</option>
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
                                <option selected>Select the Province</option>
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
                    <ErrorText
                        errors={(Object.keys(apiErrors).length !== 0) ? apiErrors : {}}
                        field="job_location"
                        data={profileData} />
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
