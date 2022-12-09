import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogIn, setUser } from "../redux/reducer/auth"

import { validEmail, validPassword } from "../utils/validator";
import ErrorText from '../component/ErrorText';
import "bootstrap/dist/css/bootstrap.css";


const LoginForm = ({ onSubmit , error}) => {
    let [loginData, setLoginData] = useState(
        {
            email: "",
            password: "",
            rememberUser: false
        }
    );

    const [logInErrors, setLoginErrors] = useState({})

    function handleChange(event) {
        const { name, value } = event.target
        if (name === "email") {
            setLoginErrors({})
            if (!validEmail.test(value)) {
                setLoginErrors(
                    {
                        ...logInErrors,
                        [name]: "invalid email address"
                    }
                )
            }
        }

        if (name === "password") {
            setLoginErrors({})
            if (!validPassword.test(value)) {
                setLoginErrors({
                    ...logInErrors,
                    [name]: "Password must be minimum 8 character long. Password must contain atleast one lowercase, uppercase, number and special character."
                })
            }
        }
        if (name === "remember_me"){
            setLoginData(
                {
                    ...loginData,
                    ["rememberUser"]: !loginData.rememberUser
                }
            )
        }
        else {
            setLoginData({
                ...loginData,
                [name]: value
            })
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={loginData.email} onChange={handleChange}
                />
                <ErrorText 
                    errors= {(Object.keys(error).length ===0) ? logInErrors : error}
                    field="email"
                    data = { loginData }/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password} onChange={handleChange}
                />
                <ErrorText 
                    errors={ (Object.keys(error).length===0) ? logInErrors : error }
                    field="password"
                    data = { loginData }/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me!" name='remember_me' 
                value={loginData.rememberUser}
                onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" block>
                Login
            </Button>
        </Form>
    );
};

export default function Login() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [apiCallErr, setApiCallErr] = useState({})
    let navigate = useNavigate()
    let dispatch = useDispatch()


    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        let email = e.target.email.value
        let password = e.target.password.value
        let rememberUser = e.target.remember_me.value
    
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
            email,
            password,
        }).then((response) => {
            navigate("/")
            if (rememberUser === "true"){
                localStorage.setItem("accessToken", response.data.accessToken)
            }
            dispatch(setUser({"user": response.data.user, "token": response.data.accessToken}))
            dispatch(userLogIn())
            handleClose();
        }).catch((err) => {
            setApiCallErr();
            err?.response?.data?.errors?.forEach(
                el => {
                    setApiCallErr((prevErr) => {
                        return {
                            ...prevErr,
                            [el.param]: el.msg
                        }
                    })
                }
            )
        })
    };

    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "10vh" }}
            >
                <div>
                    <Link variant="primary" onClick={handleShow}>Jobseeker</Link>
                </div> 
                <div className='mx-3'>
                    <Link variant="primary" onClick={handleShow}>Employer</Link>
                </div>          
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm onSubmit={onLoginFormSubmit} error = {apiCallErr}/>
                </Modal.Body>
            </Modal>
        </>
    );
}