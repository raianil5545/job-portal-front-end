import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreateEmployerProfile() {
    const [employerProfileData, setEmployerProfile] = useState({
        founded_year: "",
        website_url: "",
        logo: [],
        headquarter_address: {
            street: "",
            city: "",
            province: ""
        },
        locations: []
    });

    const navigate = useNavigate();
    const reduxAccessToken = useSelector((state) => (state.auth.token));

    const handleChange = (event) => {
        const { name, value } = event.target
        if (event.target.type === "file"){
            setEmployerProfile({
                ...employerProfileData,
                [name]: event.target.files
            });
        }
        else if (["street", "city", "province"].includes(name)){
            setEmployerProfile((prevState) => ({
                ...prevState,
                headquarter_address: {
                    ...prevState.headquarter_address,
                    [name]: value
                }
            }));
        }
        else {
            setEmployerProfile({
                ...employerProfileData,
                [name]: value
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();

        let { founded_year, website_url, logo, headquarter_address, locations } = employerProfileData;
        formData.append("founded_year", founded_year);
        formData.append("website_url", website_url);

        let logo_arr = [...logo];
        logo_arr.forEach((el) => {
            formData.append("logo", el)
        });

        formData.append("headquarter_address", JSON.stringify(headquarter_address));

        let locations_arr = locations.split(",");
        locations_arr.forEach(el => {
            formData.append("locations[]", el)
        });
          
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/employer/profile/create`,
            data: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : reduxAccessToken}`
            }
        }).then(
            (res) => {
                navigate("/");
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Founded Year</label>
                    <input className="form-control" type="date"
                        value={employerProfileData.founded_year} name="founded_year" placeholder='MM/DD/YY'
                        onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Website Url</label>
                    <input className="form-control" type="text"
                        value={employerProfileData.website_url} name="website_url" placeholder='www.example.com'
                        onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Company Logo</label>
                    <input className="form-control" type="file"
                     name="logo" onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">Street Address</label>
                    <input className="form-control" type="text"
                        value={employerProfileData.street} name="street" placeholder='street name' 
                        onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="formFileSm" class="form-label">City</label>
                    <input className="form-control" type="text"
                        value={employerProfileData.city} name="city" placeholder='name of City' 
                        onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label for="current-address" class="form-label"> Province </label>
                            <select class="form-select col-4" aria-label="Default select example" name="province" onChange={handleChange}>
                                <option selected>Select the Province</option>
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
                        value={employerProfileData.locations} name="locations" placeholder='Locations of company' 
                        onChange={handleChange}/>
                </div>
                <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
