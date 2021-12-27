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
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/log_in" element={<LogIn changeStatus={changeStatus} />} />
                    <Route path='/log_out' element={<LogOut changeStatus={changeStatus} />} />
                    <Route path="/post/create" element={<PostControl />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/post/:id/edit" element={<PostControl />} />
                    <Route path="/sign_up" element={<SignUp changeStatus={changeStatus} />} />
                    <Route path="/user/:id" element={<User />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteSwitch;