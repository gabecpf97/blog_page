import React, { useState } from "react";
import uniqid from 'uniqid';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [errors, setErrors] = useState();
    const [loadedErr, setLoadedErr] = useState(false);

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onConfirmChange = (e) => {
        setConfirm_password(e.target.value);
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const sign_up_post = async () => {
            const response = await fetch('http://localhost:5000/sign_up', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirm_password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res_data = await response.json();
            if (res_data.errors) {
                setErrors(res_data.errors);
                setLoadedErr(true);
            } else {
                const token = res_data.token;
                localStorage.setItem('token', token);
                setLoadedErr(false);
                navigate('/');
            }
        }
        sign_up_post().catch((err) => {
            console.log({err});
        })
    }

    return (
        <div className="sign_up">
            <form onSubmit={(e) => onSubmitForm(e)}>
                <div className="getUsername">
                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="username" value={username}
                        onChange={(e) => onUsernameChange(e)} />
                </div>
                <div className="getEmail">
                    <label htmlFor="email">Email: </label>
                    <input type="text" placeholder="email" value={email}
                        onChange={(e) => onEmailChange(e)} />
                </div>
                <div className="getPassword">
                    <label htmlFor="password">Password: </label>
                    <input type="text" placeholder="password" value={password}
                        onChange={(e) => onPasswordChange(e)} />
                </div>
                <div className="getConfirmPassword">
                    <label htmlFor="confirm_password">Confirm password: </label>
                    <input type="text" placeholder="confirm password" value={confirm_password}
                        onChange={(e) => onConfirmChange(e)} />
                </div>
                <input type="submit" value="Sign Up" />
            </form>
            <ul className="errors">
                {loadedErr && errors.map(error => {
                    return (
                        <li key={uniqid()}>
                            <p>{error.msg}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SignUp;