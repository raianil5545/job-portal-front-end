import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextUser } from '../Context/Context';

export default function Logout() {
    const navigate = useNavigate();
    const { userData, setUserdata } = React.useContext(ContextUser);
    if (userData.isloggedIn) {
        localStorage.clear();
        setUserdata({
            isloggedIn: false,
            token: "",
            user: {}
        })
    }
    useEffect(() => {
        navigate(0);
        navigate("/", { replace: true });
    }, [])
}
