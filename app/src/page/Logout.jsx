import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Logout() {
    let navigate = useNavigate()
    let userStatus = useSelector((state) => (state.auth.isloggedIn))
    if (userStatus){
        localStorage.clear();
    }
    useEffect(() => {
        navigate(0)
        navigate("/", {replace: true})
    }, [])
}
