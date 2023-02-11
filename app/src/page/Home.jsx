import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setjobExist, addJobs } from "../redux/reducer/jobs";
import axios from 'axios';

import ShowJobs from './ShowJobs';
import { ContextUser, ContextProfile } from '../Context/Context';
import '../css/main-body.css'


export default function Home() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [loadingJobs, setloadingJobs] = useState(true);
  const { addProfile} = React.useContext(ContextProfile);

  const {userData} = React.useContext(ContextUser)
  const accessToken = userData.token;
  const user = userData.user

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        if (res.data.length > 0) {
          addProfile({
            profileExist: true,
            profile: res.data[0]
          })
        }
        setLoading(false);
      });
    }
    else if (accessToken) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => {
        if (res.data.length > 0) {
          addProfile({
            profileExist: true,
            profile: res.data[0]
          })
        }
        setLoading(false);
      });
    }
    else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (userData?.user?.role === "applicant") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : accessToken}`
        }
      }).then(res => {
        if (res?.data?.length > 0) {
          dispatch(setjobExist());
          dispatch(addJobs({})); // clearing prev jobs
          dispatch(addJobs(res.data));
        }
        setloadingJobs(false);
      });
    }
    else if (userData?.user?.role === "employer") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/employer/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : accessToken}`
        }
      }).then(res => {
        if (res?.data?.length > 0) {
          dispatch(setjobExist());
          dispatch(addJobs({})); // clearing prev jobs
          dispatch(addJobs(res.data));
        }
        setloadingJobs(false);
      })
    }
    else {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/jobs`).then(
        (res) => {
          dispatch(setjobExist());
          dispatch(addJobs(res?.data));
          setloadingJobs(false);
        }
      ).catch((err) => {
        console.log(err);
      })
      setloadingJobs(false);
    }
  }, [userData?.user]);

  if (loading) {
    return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }
  if (loadingJobs) {
    return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }

  return (
    <main className='main'>
      <div className='container-fluid mt-3'>
        {
          userData?.user?.role === "employer" &&
            <ShowJobs />
        }
        {
          Object.keys(userData.user).length === 0 &&
            <ShowJobs />
        }
        {
          userData?.user?.role === "applicant" &&
            <ShowJobs />
        }
      </div>
    </main>
  )
}
