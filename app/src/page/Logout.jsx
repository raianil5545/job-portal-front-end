import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const userStatus = useSelector((state) => (state.auth.isloggedIn));
    if (userStatus){
        localStorage.clear();
    }
    useEffect(() => {
        navigate(0);
        navigate("/", {replace: true});
    }, [])
}
