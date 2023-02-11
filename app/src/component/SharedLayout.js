import React, {useState} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setjobExist, addJobs } from "../redux/reducer/jobs";
import { Outlet } from "react-router-dom";
import Navbar from "./Header";
import Background from "../images/background.jpg";
import '../css/sharedLayout.css'


function SharedLayout() {
    const dispatch = useDispatch();
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
    return (
        <>  
            <div className="container-fluid" style={{ backgroundImage: 'url(' + Background + ')', backgroundSize: 'cover' }}>
            <Navbar />
            <div className="d-flex justify-content-center">
                <div className="px-1 py-2 text-white background-content">
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
                <div className="d-flex justify-content-center search-div">
                    <form onSubmit={handleSubmit} className='mt-2'>
                        <input type="text" id="input-search" name="search_term"
                            value={jobSearch.search_term} onChange={handleSearch}
                            placeholder='Search Job by job title.' />
                        <button className="btn-primary" id="search-button">Search Jobs</button>
                    </form>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default SharedLayout;