import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileStatus, addProfile } from "../redux/reducer/profile";
import {setjobExist, addJobs} from "../redux/reducer/jobs"


import Background from "../images/job-poster.jpg";
import ShowJobs from './ShowJobs';
import jobContext from '../Context/jobcontext';


export default function Home() {
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [loadingJobs, setloadingJobs] = useState(true)
  let [jobs, setJobs] = useState([])
  let accessToken = useSelector((state) => (state.auth.token))
  const user = useSelector((state) => (state.auth.user))
  const profile = useSelector((state) => (state.profile.profile))


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        if (res.data.length > 0) {
          dispatch(setProfileStatus())
          dispatch(addProfile(res.data[0]))
        }
        setLoading(false)
      })
    }
    else {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/applicant/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(res => {
        if (res.data.length > 0) {
          dispatch(setProfileStatus())
          dispatch(addProfile(res.data[0]))
        }
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    if (user.role == "employer") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/employer/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : accessToken}`
        }
      }).then(res => {
        if (res?.data?.length > 0) {
          setJobs(res.data)
          dispatch(setjobExist())
          dispatch(addJobs(res.data))
        }
        setloadingJobs(false)
      })
    }
  }, [user.role])
  const [jobSearch, setJobSearch] = useState(
    {
      search_term: "",
    }
  )

  function handleSearch(event) {
    let { name, value } = event.target
    setJobSearch({
      [name]: value
    })
  }
  if (loading) {
    return <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }
  if (loadingJobs) {
    return <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }

  return (
    <>
      <div className="container-fluid" style={{ backgroundImage: 'url(' + Background + ')', backgroundSize: 'auto' }}>
        <div className='row'>
          <div className="col-6 d-flex justify-content-around ">
            <form className='mt-2'>
              <input className='mx-1' type="text" name="search_term"
                value={jobSearch.search_term} onChange={handleSearch}
                placeholder='Search Job by job title.' />
              <button className="btn-primary">Search Jobs</button>
            </form>
          </div>
          <div className='col-3'>
          </div>
          <div className="col-3 d-flex justify-content-end" style={{ backgroundColor: "rgba(51,47,47,.4)" }}>
            <div className="px-1 py-2 text-white">
              <h5>
                <span className="py-2">
                  "Let's make the quest easy."
                  <br />
                  "Solve it collectively."
                </span>
                <br />
                <br />
                "We connect employer and employee.."
                <br />
                <br />
              </h5>
              <small>Search and apply for jobs</small>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid mt-3'>
        {
          user.role === "employer" &&
          jobs.length > 0 &&
          <jobContext.Provider value={jobs}>
            <ShowJobs logo={profile.logo} />
          </jobContext.Provider>
        }
      </div>
    </>
  )
}
