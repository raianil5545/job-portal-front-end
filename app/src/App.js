import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { ContextUser } from './Context/Context';
import axios from "axios";


import Home from "./page/Home";
import Signup from "./page/Signup";
import ContactUs from "./page/ContactUs";
import Faq from "./page/Faq";
import Seachjobs from "./page/Seachjobs";
import Login from "./page/Login";
import Logout from "./component/Logout";
import UpdateProfile from './component/UpdateProfile';
import ShowJob from "./page/ShowJob";
import PostJobs from "./page/PostJobs";
import UpdateJob from "./page/UpdateJob";
import ShowJobs from "./page/ShowJobs";
import SharedLayout from "./component/SharedLayout";
import ShowProfile from "./component/ShowProfile";
import CreateProfile from "./component/CreateProfile";
import DeleteJob from "./component/DeleteJob";
import ApplyJob from "./component/ApplyJob";


function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { userData, setUserdata } = React.useContext(ContextUser);


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        setUserdata({
          isloggedIn: true,
          user: res.data
        })
        setLoading(false)
      })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setLoading(false);
      setUserdata({
        isloggedIn: false,
        token: "",
        user: {}
      })
      navigate("/");
    }
  }, []);

  if (loading) {
    return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }

  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/jobseeker">
              <Route path="job/apply/:id" element={<ApplyJob />} />
              <Route path="signup" element={<Signup usertype="applicant" />} />
              <Route path="login" element={<Login />} />
              <Route path="profile">
                <Route index element={<ShowProfile role={userData?.user?.role} />} />
                <Route path="create" element={<CreateProfile role={userData?.user?.role}/>} />
                <Route path="update" element={<UpdateProfile role={userData?.user?.role}/>} />
              </Route >
            </Route>
            <Route path="/employer">
              <Route path="signup" element={<Signup usertype="employer" />} />
              <Route path="login" element={<Login />} />
              <Route path="profile">
                <Route index element={<ShowProfile role={userData?.user?.role} />} />
                <Route path="create" element={<CreateProfile role={userData?.user?.role}/>} />
                <Route path="update" element={<UpdateProfile role={userData?.user?.role}/>} />
              </Route>
              <Route path="job">
                <Route index element={<ShowJobs />} />
                <Route path="post" element={<PostJobs />} />
                <Route path="show/:id" element={<ShowJob />} />
                <Route path="update/:id" element={<UpdateJob />} />
                <Route path="delete/:id" element={<DeleteJob />} />
              </Route>
            </Route>
            <Route path="job/show/:id" element={<ShowJob />} />
            <Route path="logout" element={<Logout />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/search" element={<Seachjobs />} />
            <Route path="*" element={<h1>Error Page Not Found</h1>} />
          </ Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
