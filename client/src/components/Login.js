import React, { useState, useContext } from 'react'
import axios from 'axios';
import '../App.css';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let history = useHistory()

    const login = () => {
        const data = { username: username, password: password }
        axios.post("https://mannie-blog.herokuapp.com/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({ username: response.data.username, id: response.data.id, status: true });
                history.push("/");
                // console.log(response.data)
            }
        })
    };

    return (
        <div className="login-box">
            <h2>Login Here</h2>
            <div className='Form1'>
                <div className='user-box'>
                    {/*  */}
                    <input type="text"
                        placeholder='Username'
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <label>Username:</label>
                </div>
                <div className='user-box'>
                    <input type="password"
                        placeholder='Password'
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                    <label>Password:</label>
                </div>
                <button onClick={login}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login