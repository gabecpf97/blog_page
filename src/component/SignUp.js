import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');

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

    const onSubmitForm = async () => {
        const option = {
            method: "POST",
            body: {
                username,
                email,
                password,
                confirm_password,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // should get token
        const user = await fetch(process.env.SIGNUP_URL, option);
        navigate('/');
    }

    return (
        <div className="sign_up">
            <form onSubmit={() => onSubmitForm()}>
                <div className="getUsername">
                    <label for="username">Username: </label>
                    <input type="text" placeholder="username"
                        value={() => onUsernameChange(e)} />
                </div>
                <div className="getEmail">
                    <label for="email">Email: </label>
                    <input type="text" placeholder="email"
                        value={() => onEmailChange(e)} />
                </div>
                <div className="getPassword">
                    <label for="password">Password: </label>
                    <input type="password" placeholder="password"
                        value={() => onPasswordChange(e)} />
                </div>
                <div className="getConfirmPassword">
                    <label for="confirm_password">Confirm password: </label>
                    <input type="text" placeholder="confirm password"
                        value={() => onConfirmChange(e)} />
                </div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default SignUp;