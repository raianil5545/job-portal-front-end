import React from 'react';

export default function ContactUs() {
    return (
        <>
            <div style={{ backgroundColor: "#002a5b" }}>
                <div className='my-9'>
                    <h2 className='my-3 text-white d-flex justify-content-center'>Contact us</h2>
                </div>
            </div>
            <div className="row">
                <div className='col-8'>
                    <a href='https://www.google.com/maps/place/Mind+Risers+Consortium+Pvt.+Ltd./@27.7034305,85.3183901,16.14z/data=!4m5!3m4!1s0x0:0x3ea9b1c08b4234dc!8m2!3d27.7012628!4d85.321213' target="_blank">
                        <img className='container-fluid' src={require('../images/mindrisers.jpg')} alt="mindrisers" />
                    </a>
                </div>
                <div className='col-4'>
                    <form>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                <i class="fa fa-user" style={{ fontSize: "36px" }}></i>
                            </span>
                            <input type="text" class="form-control" placeholder="Full Name" name="fullName" aria-describedby="basic-addon1" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon2">
                                <i class="fa fa-envelope" style={{ fontSize: "36px" }}></i>
                            </span>
                            <input type="email" class="form-control" placeholder="Email Address" name="email" aria-describedby="basic-addon2" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon3">
                                <i class="fa fa-phone" style={{ fontSize: "36px" }}></i>
                            </span>
                            <input type="number" class="form-control" placeholder="Phone Number" name="phoneNumber" aria-describedby="basic-addon3" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon4">
                                <i class="fa fa-envelope" style={{ fontSize: "36px" }}></i>
                            </span>
                            <input type="text" class="form-control" placeholder="Subject" name="subject" aria-describedby="basic-addon4" />
                        </div>
                        <div class="input-group mb-3">
                            <textarea class="form-control" placeholder="Your message here" name="message" />
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }} type="submit">Submit</button>
                    </form>
                    <div className='my-3'>
                        <div className='mx-2 my-2'>
                            <small>Kumari Galli 2</small>
                            <br />
                            <small>Kathmandu 44600</small>
                            <br />
                            <br />
                            <small>
                                Email:<b> something@jobhunter.com</b>
                                <br />
                                Phone: <b>+977-1-4106700, 4105630</b>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='container-fluid py-2' style={{ backgroundColor: "lightblue" }}>
                <span style={{ marginRight: "10%" }}><b>Search, Apply, Get Job: Free</b></span>
                <button className="btn-primary" style={{ marginRight: "5%" }}><span><i class="fa fa-user" style={{ fontSize: "15px" }}></i></span>  Register  </button>
                <button className="btn-primary" style={{ marginRight: "5%" }}><span><i class="fa fa-sign-in" style={{ fontSize: "15px" }}></i></span>  Login  </button>
            </div>
            <div>
                <div className='row py-3' style={{backgroundColor: "#E0E0E0"}}>
                    <div className='col-4' style={{borderStyle: "solid"}}>
                        <span>
                            <small>Since inception in 2009, we have turned out to be number one jobs provider
                                in Nepal with 300 million+ page views so far and 6.5 million+ progressive
                                visits every month, created 2,00,000+ success stories and registered
                                7,50,000+ job seekers in our database. We have been offering 35,000+
                                employers promote their employer brands to jobseekers and advertise diverse
                                opportunities to over a million candidates inside Nepal and abroad.
                                Established as an inevitable bridge between the hiring employers and the job seekers,
                                we are well-known as a national leader in recruitment solutions & career management in Nepal.
                            </small>
                        </span>
                    </div>
                    <div className='col-2' style={{borderStyle: "solid"}}>
                        <h5>FOR JOBSEEKER</h5>
                        <a href="#" className='mt-4'>Register</a>
                        <br/>
                        <a href="#" className='mt-2'>Search Jobs</a>
                        <br/>
                        <a href="#" className='mt-2'>Login</a>
                        <br/>
                        <a href="#" className='mt-2'>Blog</a>
                        <br/>
                        <a href="#" className='mt-2'>FAQ</a>
                    </div>
                    <div className='col-2' style={{borderStyle: "solid"}}>
                        <h5>FOR EMPLOYER</h5>
                        <a href="#" className='mt-4'>Post a Job</a>
                        <br/>
                        <a href="#" className='mt-2'>Register</a>
                        <br/>
                        <a href="#" className='mt-2'>Login</a>
                        <br/>
                        <a href="#" className='mt-2'>Recruitment Services</a>
                        <br/>
                        <a href="#" className='mt-2'>HR Insider</a>
                        <br/>
                        <a href="#" className='mt-2'>FAQ</a>
                    </div>
                    <div className='col-2' style={{borderStyle: "solid"}}>
                        <h5>ABOUT US</h5>
                        <a href="#" className='mt-4'>About Easy jobs</a>
                        <br/>
                        <a href="#" className='mt-2'>Life at easy jobs</a>
                        <br/>
                        <a href="#" className='mt-2'>Facebook</a>
                        <br/>
                        <a href="#" className='mt-2'>Recruitment Services</a>
                        <br/>
                        <a href="#" className='mt-2'>HR Insider</a>
                        <br/>
                        <a href="#" className='mt-2'>FAQ</a>
                    </div>
                    <div className='col-2' style={{borderStyle: "solid"}}>
                        <h5>CONTACT US</h5>
                        <a href="#" className='mt-4'>
                            <span>
                                <i class="fa fa-location-arrow" style={{ fontSize: "15px" }}></i>
                                <small>Kumari Galli 2, Kathmandu, 44600</small>
                                </span>
                        </a>
                        <br/>
                        <a href="#" className='mt-4'>
                            <span>
                                <i class="fa fa-phone" style={{ fontSize: "15px" }}></i>
                                <small>+977 1 4106701<br/>+977 1 4106700</small>
                                </span>
                        </a>
                        <br/>
                        <a href="#" className='mt-4'>
                            <span>
                                <i class="fa fa-envelope" style={{ fontSize: "15px" }}></i>
                                <small>something@jobhunter.com</small>
                                </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
