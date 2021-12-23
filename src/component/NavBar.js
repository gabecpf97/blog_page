import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="nav_bar">
            <h1 className="logo">Welcome to my blog</h1>
            <ul className="pages">
                <link to="/sign_up">
                    <li className="page">Sign up</li>
                </link>
                <link to="/log_in">
                    <li className="page">Log in</li>
                </link>
                <link to="/Account">
                    <li className="account"></li>
                </link>
            </ul>
        </div>
    )
}

export default NavBar;