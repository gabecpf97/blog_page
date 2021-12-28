import React from "react";
import { Link } from "react-router-dom";
import '../style/navBar.css';

const NavBar = ({status}) => {
    return (
        <div className="nav_bar">
            <Link to="/blog_page">
                <h1 className="logo">This is just a blog</h1>
            </Link>
            <ul className="pages">
                {status && 
                    <div className="loged_in">
                        <Link to='/blog_page/account'>
                            <li className="page">{
                                JSON.parse(localStorage.user).username
                            }</li>
                        </Link>
                        <Link to="/blog_page/log_out">
                            <li className="page">Log Out</li>
                        </Link>
                    </div>
                }
                {!status &&
                    <div className="visiter">
                        <Link to="/blog_page/sign_up">
                            <li className="page">Sign up</li>
                        </Link>
                        <Link to="/blog_page/log_in">
                            <li className="page">Log in</li>
                        </Link>
                    </div>
                }
            </ul>
        </div>
    )
}

export default NavBar;