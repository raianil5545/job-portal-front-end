import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { ContextUser, ContextProfile } from '../Context/Context';
import '../css/header.css'

import Login from "../page/Login";

export default function Navbar() {
    const { userData, setUserData } = React.useContext(ContextUser)
    const isUserLoggedIn = userData.isloggedIn;
    const user = userData.user;
    const {profile} = React.useContext(ContextProfile)
    const userProfileStatus = profile.profileExist


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav-bar">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <div className='w-50'>
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <NavLink className="p-3" to="/search">SEARCH JOB</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="p-3">BLOG</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact" target="_blank" className="p-3">CONTACT</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/faq" className="p-3">FAQ</NavLink>
                                </li>`
                            </ul>
                        </div>
                        {
                            !isUserLoggedIn
                            &&
                            <div className='w-25'>
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                    <li className="nav-item dropdown mx-2">
                                        <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Log In
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            <Login />
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown mx-2">
                                        <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Register
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            <NavLink to="jobseeker/signup" className="px-1">Job Seeker</NavLink>
                                            <NavLink to="employer/signup" >Employer</NavLink>
                                        </ul>
                                    </li>
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
                            </ul>
                        }
                        {
                            isUserLoggedIn && 
                            user.role === "employer" &&
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
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
                            </ul>
                        }
                        {
                            isUserLoggedIn &&
                            <NavLink className="p-3" to="/logout">Logout</NavLink>
                        }
                        <div className='w-25'>
                            <form className="d-flex">
                                <input className="form-control me-2 form-search" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success form-search" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <div className="container-fluid logo-div d-flex justify-content-left">
                    <Link reloadDocument to="/"><img className='logo-img ' src={require("../images/easy-jobs.png")} width="400" height="100" /></Link>
                </div>
            </div>
        </>

    );
}

