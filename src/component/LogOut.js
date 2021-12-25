import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ changeStatus }) => {
    const nav = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        changeStatus();
        nav('/');
    }

    return (
        <div className="log_out">
            <p>Log Out?</p>
            <button onClick={() => handleLogOut()}>Log Out</button>
        </div>
    )
}

export default LogOut;