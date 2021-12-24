import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './NavBar';
import Home from './Home';
import Post from './Post';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Account from './Account';

const RouteSwitch = () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/account" element={<Account />} />
                    <Route path="/log_in" element={<LogIn />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/sign_up" element={<SignUp />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteSwitch;