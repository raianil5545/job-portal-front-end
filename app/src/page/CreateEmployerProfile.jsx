import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEmployerProfile() {
    let [employerProfileData, setEmployerProfile] = useState({
        founded_year: "",
        website_url: "",
        logo: "",
        headquarter_address: {
            "street": "",
            "city": "",
            "province": ""
        },
        locations: ""
    })

    let navigate = useNavigate()

    let handleChange = (event) => {
        let { name, value } = event.target
        if (event.target.type === "file"){
            setEmployerProfile({
                ...employerProfileData,
                [name]: event.target.files
            })
        }
        if (["street", "city", "province"].includes(name)){
            setEmployerProfile((prevState) => ({
                ...prevState,
                headquarter_address: {
                    ...prevState.headquarter_address,
                    [name]: value
                }
            }))
        }
        setEmployerProfile({
            ...employerProfileData,
            [name]: value
        })
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        let { founded_year, website_url, logo, headquarter_address, locations } = employerProfileData
        formData.append("founded_year", founded_year)
        formData.append("website_url", website_url)
        logo_arr = [...logo]
        logo_arr.forEach((el) => {
            formData.append("logo", el)
        })
        formData.append("headquarter_address", headquarter_address)
        let locations_arr = locations.split(",")
        formData.append("locations", locations_arr)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/employer/profile/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then((res)=> {
            console.log(res)
            navigate("")
        }).catch((err) => {
            navigate("/employer/profile/create")
            alert("Error message: ", err)
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Founded Year</label>
                    <input className="form-control" type="date"
                        value="" name="founded_year" placeholder='MM/DD/YY'
                        onClick={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Website Url</label>
                    <input className="form-control" type="text"
                        value="" name="website_url" placeholder='www.example.com'
                        onClick={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Company Logo</label>
                    <input className="form-control" type="file"
                     name="logo" onClick={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Street Address</label>
                    <input className="form-control" type="text"
                        value="" name="street" placeholder='street name' 
                        onClick={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">City</label>
                    <input className="form-control" type="text"
                        value="" name="city" placeholder='name of City' 
                        onClick={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="current-address" class="form-label"> Province </label>
                            <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
                                <option value="province no 1">Province No 1</option>
                                <option value="bagmati">Bagmati</option>
                                <option value="madhesh">Madhesh</option>
                                <option value="lumbini">Lumbini</option>
                                <option value="gandaki">Gandaki</option>
                                <option value="karnali">Karnali</option>
                                <option value="sudur paschim">Sudur Paschim</option>
                            </select>
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Location</label>
                    <input className="form-control" type="text"
                        value="" name="locations" placeholder='Locations of company' 
                        onClick={handleChange}/>
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
