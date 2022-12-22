import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setjobExist, addJobs } from "../redux/reducer/jobs";


import Background from "../images/job-poster.jpg";
import ShowJobs from './ShowJobs';
import { ContextUser, ContextProfile } from '../Context/Context';


export default function Home() {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [loadingJobs, setloadingJobs] = useState(true);
  const { addProfile} = React.useContext(ContextProfile);

  const {userData} = React.useContext(ContextUser)
  const accessToken = userData.token;

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
  }, []);

  useEffect(() => {
    if (userData?.user?.role === "employer") {
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
      });
    }
    else if (userData?.user?.role === "applicant") {
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

  const [jobSearch, setJobSearch] = useState(
    {
      search_term: "",
    }
  );

  function handleSearch(event) {
    const { name, value } = event.target;
    setJobSearch({
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { search_term } = jobSearch;
    axios.get(`${process.env.REACT_APP_SERVER_URL}/jobs?search_term=${search_term}`).then(
      (res) => {
        dispatch(setjobExist());
        dispatch(addJobs(res?.data));
      }
    ).catch((err) => {
      console.log(err);
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
            <form onSubmit={handleSubmit} className='mt-2'>
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
    </>
  )
}
