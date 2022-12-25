import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ContextUser, ContextProfile } from "../Context/Context";
import { useNavigate } from "react-router-dom";


function ApplyJob(){
    const id = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const userData = React.useContext(ContextUser);
    const userProfile = React.useContext(ContextProfile);

    const token = userData.token;
    const job_id = id.id;
    const job = location.state.job;
    const resume = `http://localhost:8000/${userProfile?.profile?.profile?.resume}`;

    let data = {};
    data["job_name"] = job.job_name;
    data["job_category"] = job.job_category;
    data["job_level"] = job.job_level;
    data["employment_type"] = job.employment_type;
    data["employer_id"] = job.employer_id;
    data["resume"] = resume;
    axios({
        method:"post",
        url: `${process.env.REACT_APP_SERVER_URL}/applicant/job/apply/${job_id}`,
        data: data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : token}`
        }
    }).then((res) => {
        navigate("/")
    }).catch((err) => {
        console.log(err)
    })

}

export default ApplyJob;