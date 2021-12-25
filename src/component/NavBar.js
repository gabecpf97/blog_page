import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="nav_bar">
            <Link to="/">
                <h1 className="logo">Welcome to my blog</h1>
            </Link>
            <ul className="pages">
                <Link to="/sign_up">
                    <li className="page">Sign up</li>
                </Link>
                <Link to="/log_in">
                    <li className="page">Log in</li>
                </Link>
                <Link to="/Account">
                    <li className="account">Account</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar;