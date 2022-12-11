import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";


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
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogIn, setUser, userLogout } from "../src/redux/reducer/auth";


function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    if (localStorage.getItem("accessToken")){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        dispatch(userLogIn())
        dispatch(setUser({"user": res.data}))
      })
      .catch(err => {
        dispatch(userLogout())
      })
    }
  }, [dispatch])

  return (
    <>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
