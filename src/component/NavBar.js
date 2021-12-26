import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({status}) => {
    return (
        <div className="nav_bar">
            <Link to="/">
                <h1 className="logo">Welcome to my blog</h1>
            </Link>
            <ul className="pages">
                {status && 
                    <div className="loged_in">
                        <Link to="/log_out">
                            <li className="page">Log Out</li>
                        </Link>
                        <Link to='/account'>
                            <li className="page">{
                                JSON.parse(localStorage.user).username
                            }</li>
                        </Link>
                    </div>
                }
                {!status &&
                    <div className="visiter">
                        <Link to="/sign_up">
                            <li className="page">Sign up</li>
                        </Link>
                        <Link to="/log_in">
                            <li className="page">Log in</li>
                        </Link>
                    </div>
                }
            </ul>
        </div>
    )
}

export default NavBar;