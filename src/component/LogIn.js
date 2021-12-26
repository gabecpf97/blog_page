import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ changeStatus }) => {
    const nav = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();
    const [hasError, setHasError] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const log_in_post = async () => {
            const response = await fetch('http://localhost:5000/log_in', {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {'Content-Type': 'application/json'}
            });
            const res_data = await response.json();
            if (res_data.message) {
                setErrors(res_data.message);
                setHasError(true);
            } else {
                const token = res_data.token;
                const user = res_data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                changeStatus();
                nav('/');
            }
        }

        log_in_post().catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="log_in">
            <h1>Log In</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="getEmail">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" required={true}
                        onChange={(e) => onEmailChange(e)}/>
                </div>
                <div className="getPassword">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" required={true}
                        onChange={(e) => onPasswordChange(e)}/>
                </div>
                <input type="submit" value="Log In" />
            </form>
            {hasError && 
                <div className="error">
                    <p>{errors}</p>
                </div>
            }
        </div>
    )
}

export default LogIn;