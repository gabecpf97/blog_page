import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Home from './Home';
import Account from './Account';
import Post from './Post';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';
import User from './User';
import '../style/style.css';
import PostControl from './PostControl';

const RouteSwitch = () => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token'))
            setStatus(true);
    }, []);

    const changeStatus = () => {
        setStatus(status => !status);
    }

    return (
        <div className='container'>
            <BrowserRouter>
                <NavBar status={status} />
                <Routes>
                    <Route path="/blog_page" element={<Home />} />
                    <Route path="/blog_page/account" element={<Account />} />
                    <Route path="/blog_page/log_in" element={<LogIn changeStatus={changeStatus} />} />
                    <Route path='/blog_page/log_out' element={<LogOut changeStatus={changeStatus} />} />
                    <Route path="/blog_page/post/create" element={<PostControl />} />
                    <Route path="/blog_page/post/:id" element={<Post />} />
                    <Route path="/blog_page/post/:id/edit" element={<PostControl />} />
                    <Route path="/blog_page/sign_up" element={<SignUp changeStatus={changeStatus} />} />
                    <Route path="/blog_page/user/:id" element={<User />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteSwitch;