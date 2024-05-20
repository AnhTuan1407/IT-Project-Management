import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";

export const PrivateRouter = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const navigate=useNavigate();
    const checkTokenExpiration = () => {
        if (!token) return false;
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        return Date.now() < exp * 1000;
    };
    useEffect(() => {
        if (!checkTokenExpiration()) {
            localStorage.clear();
            console.log(localStorage.getItem("roles")+"private")
            toast.error("Phiên làm việc đã hết hạn",{autoClose: 1500});
            navigate("/login", { state: { from: location } });
        }
    }, [token, location, navigate]);

    return checkTokenExpiration() ? children : <Navigate to="/login" />;
};

