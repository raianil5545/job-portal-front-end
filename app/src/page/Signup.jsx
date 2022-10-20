import React, { useState } from 'react';


export default function Signup({ usertype }) {
    let [signUpData, setsignUpData] = useState(
        {
            name: "",
            email: "",
            password: "",
            role: "",
            mobile_number: ""
        }
    )

    function handleChange(event) {
        const { name, value } = event.target
        setsignUpData({
            ...signUpData,
            [name]: value,
            role: usertype
        })
    }
    return (
        <>
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control"
                        name="name" id={`name-${usertype}`}
                        value={signUpData.name} onChange={handleChange}
                        placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control"
                        name="email" id={`email-${usertype}`}
                        value={signUpData.email} onChange={handleChange}
                        placeholder="Email Address" required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        name="password" id={`password-${usertype}`}
                        value={signUpData.email} onChange={handleChange}
                        placeholder="Password" required />
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control"
                        name="mobile_number" id={`mobile-number-${usertype}`}
                        value={signUpData.mobile_number} onChange={handleChange}
                        placeholder="Mobile Number" required />
                </div>
                <button type="submit" style={{width: '100%'}} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
