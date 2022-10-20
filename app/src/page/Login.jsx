import React, { useState } from 'react';


import { validEmail, validPassword } from "../utils/validator"


export default function Login({ usertype }) {
    const [loginData, setLoginData] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [logInErrors, setLoginErrors] = useState({})

    function handleChange(event) {
        const { name, value } = event.target
        if (name === "email") {
            setLoginErrors({})
            if (!validEmail.test(value)){
                setLoginErrors(
                    {
                        ...logInErrors,
                        [name]: "invalid email address"
                    }
                )
            }
        }

        if (name === "password"){
            setLoginErrors({})
            if (!validPassword.test(value)){
                setLoginErrors({
                    ...logInErrors,
                    [name]: "Password must be minimum 8 character long. Password must contain atleast one lowercase, uppercase, number and special character."
                })
            }
        }
        setLoginData({
            ...loginData,
            [name]: value
        })

        console.log(name, value)
    }
    return (
        <>
            <form>
                <div className="mb-3">
                    <input type="email" className="form-control"
                        name="email" id={`email-${usertype}`} 
                        value = { loginData.email } onChange={ handleChange }
                        placeholder="Email Address" required/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control"
                        name="password" id={`current-password-${usertype}`}
                        value = { loginData.password } onChange={handleChange} 
                        placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Submit</button>
            </form>
        </>
    )
}
