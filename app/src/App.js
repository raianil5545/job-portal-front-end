import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


import './App.css';
import Navbar from './component/Navbar';
import Home from "./page/Home";
import Signup from "./page/Signup";
import ContactUs from "./page/ContactUs";
import Faq from "./page/Faq";
import Seachjobs from "./page/Seachjobs";
import Login from "./page/Login";
import ShowApplicantProfile from "./page/ShowApplicantProfile";
import UpdateApplicantProfile from "./page/UpdateApplicantProfile";
import CreateApplicantProfile from "./page/CreateApplicantProfile";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogIn, setUser, userLogout } from "../src/redux/reducer/auth";
import { setProfileStatus, addProfile } from "../src/redux/reducer/profile";


function App() {
  const [userFetched, setuserFetched] = useState(false);
  const dispatch = useDispatch()
  let [loading, setLoading] = useState(true)
  useEffect(()=>{
    if (localStorage.getItem("accessToken")){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        dispatch(userLogIn())
        dispatch(setUser(res.data))
        setuserFetched(true)
      })
      .catch(err => {
        dispatch(userLogout())
        setuserFetched(true)
      })
    }
  })
  useEffect(() => {
    if (localStorage.getItem("accessToken")){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        if (res.data.length > 0){
            dispatch(setProfileStatus())
            dispatch(addProfile(res.data[0]))
        }
        setLoading(false)
      })
    }
}, [])
if (loading){
  return <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
}
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
          <Route path = "/applicant/profile" element={<ShowApplicantProfile />} />
          <Route path = "/applicant/profile/update" element = {<UpdateApplicantProfile />} />
          <Route path="/applicant/profile/create" element ={<CreateApplicantProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
