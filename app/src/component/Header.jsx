import React, {useState} from 'react';
import { NavLink, Link } from "react-router-dom";
import { ContextUser, ContextProfile } from '../Context/Context';
import '../css/navbar.css'

import Login from "../page/Login";

export default function Navbar() {
    const { userData } = React.useContext(ContextUser)
    const isUserLoggedIn = userData.isloggedIn;
    const user = userData.user;
    const {profile} = React.useContext(ContextProfile)
    const userProfileStatus = profile.profileExist
    const [colorChange, setColorChange] = useState(false);
    const changeNavBarColor = () => {
        if (window.scrollY >=80){
            setColorChange(true)
        }
        else {
            setColorChange(false)
        }
    };
    window.addEventListener('scroll', changeNavBarColor);

    return (
        <>
            <nav className={colorChange ? "navbar navbar-expand-lg navbar-light nav-bar navbar-fixed-top colorChange": "navbar navbar-expand-lg navbar-light nav-bar navbar-fixed-top"}>
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <Link className='logo-param'  reloadDocument to="/"><img className='bg-img' src={require("../images/easy-jobs.png")} alt="logo"/></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <div className="d-flex justify-content-center main-left">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <NavLink className="p-3" to="/search">SEARCH JOB</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="p-3" to="#">BLOG</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="p-3" to="/contact">CONTACT</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/faq" className="p-3">FAQ</NavLink>
                                </li>
                            </ul>
                        </div>
                        {
                            !isUserLoggedIn
                            &&
                            <div className='d-flex justify-content-end main-right'>
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                    <div class="dropdown mx-3">
                                        <button class="btn btn-success dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: "5%" }}><span><i className="fa fa-sign-in" style={{ fontSize: "15px" }}></i></span>  Login  </button>
                                        <div class="dropdown-menu btn-primary" aria-labelledby="dropdownMenuButton">
                                            <Login />
                                        </div>
                                    </div>
                                    <div class="dropdown">
                                        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" 
                                            aria-haspopup="true" aria-expanded="false" style={{ marginRight: "5%" }}><span><i className="fa fa-user" 
                                            style={{ fontSize: "15px" }}></i></span>  Register  </button>
                                        <div class="dropdown-menu btn-primary drop-downbutton" aria-labelledby="dropdownMenuButton">
                                            <NavLink to="jobseeker/signup" className="px-3">Job Seeker</NavLink>
                                            <NavLink to="employer/signup" >Employer</NavLink>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        }
                        {
                            isUserLoggedIn &&
                            user.role === "applicant"
                            && 
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item dropdown mx-2">
                                        <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profile
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            {
                                                !userProfileStatus &&
                                                <li className="nav-item">
                                                    <NavLink className="p-3" to="/jobseeker/profile/create">Create</NavLink>
                                                </li>
                                            }
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="/jobseeker/profile">View</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="/jobseeker/profile/update">Update</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="">Delete</NavLink>
                                        </li>
                                        </ul>
                                    </li>
                                <li className="nav-item dropdown my-2">
                                    <NavLink className="p-3" to="/logout">Logout</NavLink>
                                </li>
                            </ul>
                        }
                        {
                            isUserLoggedIn &&
                            user.role === "employer"
                            && 
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                 <li className="nav-item dropdown mx-2">
                                        <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profile
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            {
                                                !userProfileStatus &&
                                                <li className="nav-item">
                                                    <NavLink className="p-3" to="/employer/profile/create">Create</NavLink>
                                                </li>
                                            }
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="/employer/profile">View</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="/employer/profile/update">Update</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="">Delete</NavLink>
                                        </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown mx-2">
                                        <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Jobs
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li className="nav-item">
                                                    <NavLink className="p-3" to="/employer/job/post">Post Job</NavLink>
                                                </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="/employer/job">View Jobs</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="p-3" to="">Delete Jobs</NavLink>
                                        </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown my-2">
                                        <NavLink className="p-3" to="/logout">Logout</NavLink>
                                    </li>
                            </ul>
                        }
                        {/* {
                            isUserLoggedIn &&
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li>
                                <NavLink className="p-3" to="/logout">Logout</NavLink>
                                </li>
                            </ul>
                        } */}
                    </div>
                </div>
            </nav>
        </>

    );
}