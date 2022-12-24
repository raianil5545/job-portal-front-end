import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ContextUser } from "../Context/Context";


function DeleteJob(){
    const job_id = useParams();
    const navigate = useNavigate()
    const {userData} = React.useContext(ContextUser);
    const token = userData.token;
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/employer/job/delete/${job_id.id}`,
        {headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : token}`
        }}).then((res) => {
        navigate("/");
    }).catch((err) => {
        console.log(err);
        navigate("/")
    });

}
export default DeleteJob