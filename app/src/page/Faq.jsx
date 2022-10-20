import React from 'react';
import Faqbackground from "../images/faq-background.jpg"

export default function Faq() {
    return (
        <>
            <div className='container-fluid' style={{ backgroundImage: 'url(' + Faqbackground + ')', backgroundSize: 'auto' }}>
                <div className='row'>
                    <div className="col-6">
                        <h4 style={{ marginTop: "10px", paddingTop: "10px" }}>We are here to help you</h4>
                        <br></br>
                        <form style={{ marginTop: "10px", paddingBottom: "30px" }}>
                            <input style={{ width: "50%" }} type="text" Placeholder="Search Your Queries Here" />
                            <button className='btn-primary mx-1' style={{ width: "20%" }}>Search</button>
                        </form>
                    </div>
                    <div className='col-6'>
                        <img src={require("../images/faq.jpg")} style={{ paddingTop: "30px" }} alt="faq" />
                    </div>
                </div>
            </div>
            <br/>
            <div className='"container-fluid' style={{padding: "30px", marging: "10px", backgroundColor: "lightblue"}}>
                <h2 className='d-flex justify-content-center text-primary'>Are you employer or Job seeker?</h2>
                <div style={{ padding: "10px" }}>
                    <div className='row'>
                        <div className='col-6 d-flex justify-content-center'>
                            <a href='#'>
                                <div style={{ border: "solid", color: "black" }}>
                                    <div className='row'>
                                        <div className='col-2 d-flex align-items-center'>
                                            <span style={{padding: "5px"}}><i class="fa fa-user" style={{ fontSize: "36px" }}></i></span>
                                        </div>
                                        <div className='col-10'>
                                            <h3>Job Seeker</h3>
                                            <small>Looking for a job, find answer to your queries.</small>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className='col-6 d-flex justify-content-center'>
                            <a href='#'>
                                <div style={{ border: "solid", color: "black" }}>
                                    <div className='row'>
                                        <div className='col-2 d-flex align-items-center'>
                                            <span style={{padding: "5px"}}><i class="fa fa-building" style={{ fontSize: "36px" }}></i></span>
                                        </div>
                                        <div className='col-10'>
                                            <h3>Employer</h3>
                                            <small>All about employers account and easy jobs services.</small>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div>
                <h1 className='d-flex justify-content-center text-black-50' style={{textDecoration: "underline"}}>
                    Most Popular FAQ
                </h1>
                <br/>
                <div className='row d-flex justify-content-center'>
                    <div className='col-5' style={{border: "solid", marginRight: "10px"}}>
                        <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px", marginTop: "10px"}}>
                                    <i class="fa fa-user" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>How can I register my profile at merojob?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    122
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-5' style={{border: "solid", marginLeft: "10px"}}>
                    <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px"}}>
                                    <i class="fa fa-building" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>How much do you charge for job placement?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    963
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <div className='row d-flex justify-content-center'>
                    <div className='col-5' style={{border: "solid", marginRight: "10px"}}>
                        <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px", marginTop: "10px"}}>
                                    <i class="fa fa-user" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>How can I download the admit card to attend the written test?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    122
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-5' style={{border: "solid", marginLeft: "10px"}}>
                    <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px"}}>
                                    <i class="fa fa-user" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>Can someone review my resume and give me advice?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    963
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <br/>
                <div className='row d-flex justify-content-center'>
                    <div className='col-5' style={{border: "solid", marginRight: "10px"}}>
                        <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px", marginTop: "10px"}}>
                                    <i class="fa fa-building" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>I am not registered with merojob. Can I post job vacancies?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    122
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-5' style={{border: "solid", marginLeft: "10px"}}>
                    <div className='row'>
                            <div className='col-1'>
                                <span style={{padding: "5px"}}>
                                    <i class="fa fa-user" style={{ fontSize: "36px" }}></i>
                                </span>
                            </div>
                            <div className='col-8' style={{padding: "5px"}}>
                                <h5>What kind of jobs should I apply to?</h5>
                            </div>
                            <div className='col-3'>
                                <p>
                                    Views:
                                    <br/>
                                    963
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <br/>
            <div className='container-fluid py-2' style={{ backgroundColor: "lightblue" }}>
                <span style={{ marginRight: "10%" }}><b>Search, Apply, Get Job: Free</b></span>
                <button className="btn-primary" style={{ marginRight: "5%" }}><span><i class="fa fa-user" style={{ fontSize: "15px" }}></i></span>  Register  </button>
                <button className="btn-primary" style={{ marginRight: "5%" }}><span><i class="fa fa-sign-in" style={{ fontSize: "15px" }}></i></span>  Login  </button>
            </div>
        </>
    )
}
