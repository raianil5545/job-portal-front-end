import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './App.css';
import Navbar from './component/Navbar';
import Home from "./page/Home";
import Signup from "./page/Signup";
import ContactUs from "./page/ContactUs";
import Faq from "./page/Faq";
import Seachjobs from "./page/Seachjobs";
import Login from "./page/Login";
import Logout from "./page/Logout";
import ShowApplicantProfile from "./page/ShowApplicantProfile";
import UpdateApplicantProfile from "./page/UpdateApplicantProfile";
import CreateApplicantProfile from "./page/CreateApplicantProfile";
import CreateEmployerProfile from "./page/CreateEmployerProfile";
import ShowEmployerProfile from "./page/ShowEmployerProfile";
import UpdateEmployerProfile from "./page/UpdateEmployerProfile";
import ShowJob from "./page/ShowJob";
import PostJobs from "./page/PostJobs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogIn, setUser, userLogout } from "../src/redux/reducer/auth";
import UpdateJob from "./page/UpdateJob";
import ShowJobs from "./page/ShowJobs";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    if (localStorage.getItem("accessToken")){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        dispatch(userLogIn());
        dispatch(setUser(res.data));
        setLoading(false)
      })
      .catch(err => {
        dispatch(userLogout());
      });
    }
    else {
      setLoading(false)
      navigate("/");
    }
  }, []);
  if (loading) {
    return <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }

  return (
    <>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />}/>
          <Route path="/jobseeker/signup" element={<Signup usertype="applicant" />} />
          <Route path="/employer/signup" element={<Signup usertype="employer" />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/search" element={<Seachjobs />}/>
          <Route path="/jobseeker/login" element={<Login />}/>
          <Route path="/employer/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path = "/applicant/profile" element={<ShowApplicantProfile />} />
          <Route path = "/applicant/profile/update" element = {<UpdateApplicantProfile />} />
          <Route path="/applicant/profile/create" element ={<CreateApplicantProfile />} />
          <Route path="/employer/profile/create" element={<CreateEmployerProfile />} />
          <Route path = "/employer/profile" element={<ShowEmployerProfile />} />
          <Route path = "employer/profile/update" element={<UpdateEmployerProfile />} />
          <Route path = "/employer/job/post" element={<PostJobs />} />
          <Route path="/job/show/:id" element={<ShowJob />} />
          <Route path="/employer/jobs" element={<ShowJobs />} />
          <Route path="/employer/job/update/:id" element={<UpdateJob />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
