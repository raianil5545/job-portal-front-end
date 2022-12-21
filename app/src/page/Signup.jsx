import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ErrorText from '../component/ErrorText';


export default function Signup({ usertype }) {
    const navigate = useNavigate();
    let [signUpData, setsignUpData] = useState(
        {
            name: "",
            email: "",
            password: "",
            role: "",
            mobile_number: ""
        }
    );

    let [errAPIcalData, seterrAPICall] = useState(
        {}
    );

    function handleChange(event) {
        const { name, value } = event.target
        setsignUpData({
            ...signUpData,
            [name]: value,
            role: usertype
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, password, role, mobile_number } = signUpData;
        
        var login_path = (role === "employer") ? "/employer/login" : "/jobseeker/login";
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/signup`, {
            name, 
            email,
            password,
            role,
            mobile_number
        } ).then((response) => {
            navigate(login_path)
        }).catch((err)=> {
            seterrAPICall();
            err?.response?.data?.errors?.forEach(
                el => {
                   seterrAPICall((prevErr) => {
                    return {
                        ...prevErr,
                        [el.param]: el.msg
                    }
                   });
                }
            );
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        name="name" id={`name-${usertype}`}
                        value={signUpData.name} onChange={handleChange}
                        placeholder="Full Name" required />
                    <ErrorText 
                    errors={ errAPIcalData }
                    field="name"
                    data = { signUpData }/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control"
                        name="email" id={`email-${usertype}`}
                        value={signUpData.email} onChange={handleChange}
                        placeholder="Email Address" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="email"
                    data = { signUpData }/>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        name="password" id={`password-${usertype}`}
                        value={signUpData.password} onChange={handleChange}
                        placeholder="Password" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="password"
                    data = { signUpData }/>
                <div className="mb-3">
                    <input type="number" className="form-control"
                        name="mobile_number" id={`mobile-number-${usertype}`}
                        value={signUpData.mobile_number} onChange={handleChange}
                        placeholder="Mobile Number" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="number"
                    data = { signUpData }/>
                <button type="submit" style={{width: '100%'}} className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
