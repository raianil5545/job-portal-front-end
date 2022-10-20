import React from 'react';
import { NavLink, Link } from "react-router-dom";
import Modal from 'react-modal';


import Login from "../page/Login";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '25%',
        left: '70%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function Navbar() {
    let subtitle = {
        style: {
            color: '#f00'
        }
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
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
                    <div className='w-25'>
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item dropdown mx-2">
                                <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Log In
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <div className="container-fluid d-flex justify-content-end">
                                        <NavLink onClick={openModal}>Job Seeker</NavLink>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Login Modal"
                                        >
                                            <Login usertype="job-seeker"/>
                                            <button className='mt-1' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>
                                    <div className="container-fluid d-flex justify-content-end">
                                        <NavLink onClick={openModal}>Employer</NavLink>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="LogIn Modal"
                                        >
                                            <Login usertype="employer"/>
                                            <button className='mt-1' onClick={closeModal}>close</button>
                                        </Modal>
                                    </div>
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
            <Link to="/"><img src={require("../images/easy-jobs.png")} width="400" height="100"/></Link>
        </div>
        </div>
    </>
       
    )
}

