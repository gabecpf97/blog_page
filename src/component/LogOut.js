import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ changeStatus }) => {
    const nav = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        changeStatus();
        nav('/');
    }

    return (
        <div className="log_out">
            <h1>Log Out?</h1>
            <button onClick={() => handleLogOut()}>Log Out</button>
        </div>
    )
}

export default LogOut;