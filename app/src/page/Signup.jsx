import React, { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ErrorText from '../component/ErrorText';


export default function Signup({ usertype }) {
    const navigate = useNavigate();
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const  mobileNumberRef = useRef()

    let [errAPIcalData, seterrAPICall] = useState(
        {}
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const mobile_number = mobileNumberRef.current.value;
        const role = usertype;
        
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
                        ref={ nameRef }
                        placeholder="Full Name" required />
                    <ErrorText 
                    errors={ errAPIcalData }
                    field="name"
                    data = { nameRef }/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control"
                        name="email" id={`email-${usertype}`}
                        ref={ emailRef }
                        placeholder="Email Address" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="email"
                    data = { emailRef }/>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        name="password" id={`password-${usertype}`}
                        ref={ passwordRef }
                        placeholder="Password" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="password"
                    data = { passwordRef }/>
                <div className="mb-3">
                    <input type="number" className="form-control"
                        name="mobile_number" id={`mobile-number-${usertype}`}
                        ref={ mobileNumberRef}
                        placeholder="Mobile Number" required />
                </div>
                <ErrorText 
                    errors={ errAPIcalData }
                    field="number"
                    data = { mobileNumberRef }/>
                <button type="submit" style={{width: '100%'}} className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
