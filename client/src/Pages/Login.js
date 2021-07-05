import React, { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(creds) {
    return fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(data => data.json())
}

const Login = ({setToken}) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });

        console.log(token);

        setToken(token);
    }

    return (
        <div className="container" id="login-wrapper">
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="login-username" className="form-label">Username</label>
                <span className="required">*</span>
                <input type="text" className="form-control" id="login-username" required onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Password</label>
                <span className="required">*</span>
                <input type="password" className="form-control" id="login-password" required onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
            </div>
            <div>
                <p id="error-message" style={{color: "red"}}>Login failed, please try again.</p>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;