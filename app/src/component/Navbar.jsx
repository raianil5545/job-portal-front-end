import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import Login from "../page/Login";

export default function Navbar() {
    const isUserLoggedIn = useSelector((state) => state.auth.isloggedIn)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        <div className='w-25'>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <div className="container-fluid d-flex justify-content-left">
                    <Link to="/"><img src={require("../images/easy-jobs.png")} width="400" height="100" /></Link>
                </div>
            </div>
        </>

    )
}

