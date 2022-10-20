import React, { useState } from 'react';


import Background from "../images/job-poster.jpg";

export default function Home() {
  const [jobSearch, setJobSearch] = useState(
    {
      search_term: "",
    }
  )

  function handleSearch(event){
    let {name, value} = event.target
    setJobSearch({
      [name]: value
    })
  }
  return (
    <>
      <div className="container-fluid" style={{ backgroundImage: 'url(' + Background + ')', backgroundSize: 'auto' }}>
        <div className='row'>
          <div className="col-6 d-flex justify-content-around ">
            <form className='mt-2'>
              <input className='mx-1' type="text" name="search_term" 
              value = {jobSearch.search_term} onChange={handleSearch}
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
    </>
  )
}
