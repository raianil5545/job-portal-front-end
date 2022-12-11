import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdateEmployerProfile() {
  let profile = useSelector((state) => (state.profile.profile))
  let navigate = useNavigate()
  let reduxAccessToken = useSelector((state) => (state.auth.user.token))

  let [updateProfileData, setProfileData] = useState({
    headquarter_address: profile.headquarter_address,
    founded_year: "",
    locations: profile.locations.join(" , "),
    logo: [],
    website_url: profile.website_url
  })

  let handleChange = (event) => {
    let { name, value } = event.target
    if (event.target.type === "file"){
      setProfileData({
        ...updateProfileData,
        [name]: event.target.files
      })
    }
    else if (["street", "city", "province"].includes(name)){
      setProfileData((prevState) => ({
        ...prevState,
        headquarter_address: {
            ...prevState.headquarter_address,
            [name]: value
        }
    }))
    }
    else {
      setProfileData({
        ...updateProfileData,
        [name]: value
      })
    }
  }

  let handleSubmit = (event) => {
    event.preventDefault()
    const {headquarter_address, founded_year, locations, logo, website_url} = updateProfileData
    let form_data = new FormData()
    if (founded_year){
      form_data.append("founded_year", founded_year)
    }
    if (headquarter_address !== profile.headquarter_address){
      form_data.append("headquarter_address", JSON.stringify(headquarter_address))
    }
    if (locations !== profile.locations.join(" , ")){
      form_data.append("locations", locations)
    }
    if (website_url !== profile.website_url){
      form_data.append("website_url", website_url)
    }
    let logo_arr = [...logo]
    logo_arr.forEach(el => {
      form_data.append("logo", el)
    })
    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}/employer/profile/update`,
      data: form_data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : reduxAccessToken}`
            }
    }).then(res => {
      navigate("/")
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">Founded Year</label>
          <input className="form-control" type="date"
           name="founded_year" placeholder='MM/DD/YY'
            onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">Website Url</label>
          <input className="form-control" type="text"
            value={updateProfileData.website_url} name="website_url" placeholder='www.example.com'
            onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">Company Logo</label>
          <input className="form-control" type="file"
            name="logo" onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">Street Address</label>
          <input className="form-control" type="text"
            value={updateProfileData.headquarter_address.street} name="street" placeholder='street name'
            onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">City</label>
          <input className="form-control" type="text"
            value={updateProfileData.headquarter_address.city} name="city" placeholder='name of City'
            onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label for="current-address" class="form-label"> Province </label>
          <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
            <option value="province no 1" selected={updateProfileData.headquarter_address.province === "province no 1" ? "selected" : ""}>Province No 1</option>
            <option value="bagmati" selected={updateProfileData.headquarter_address.province === "bagmati" ? "selected" : ""}>Bagmati</option>
            <option value="madhesh" selected={updateProfileData.headquarter_address.province === "madhesh" ? "selected" : ""}>Madhesh</option>
            <option value="lumbini" selected={updateProfileData.headquarter_address.province === "lumbini" ? "selected" : ""}>Lumbini</option>
            <option value="gandaki" selected={updateProfileData.headquarter_address.province === "gandaki" ? "selected" : ""}>Gandaki</option>
            <option value="karnali" selected={updateProfileData.headquarter_address.province === "karnali" ? "selected" : ""}>Karnali</option>
            <option value="sudur paschim" selected={updateProfileData.headquarter_address.province === "sudur paschim" ? "selected" : ""}>Sudur Paschim</option>
          </select>
        </div>
        <div className='mb-3'>
          <label for="formFileSm" class="form-label">Location</label>
          <input className="form-control" type="text"
            value={updateProfileData.locations} name="locations" placeholder='Locations of company'
            onChange={handleChange} />
        </div>
        <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}
