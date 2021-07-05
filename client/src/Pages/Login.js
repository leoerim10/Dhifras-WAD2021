import React, { useState } from 'react';

const Login = () => {




    return (
        <div className="container" id="login-wrapper">
        <form id="login-form">
            <div class="mb-3">
                <label for="login-username" className="form-label">Username</label>
                <span className="required">*</span>
                <input type="text" class="form-control" id="login-username" required />
            </div>
            <div className="mb-3">
                <label for="login-password" className="form-label">Password</label>
                <span className="required">*</span>
                <input type="password" className="form-control" id="login-password" required />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <div>
                <p id="error-message" style={{color: "red"}}>Login failed, please try again.</p>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
    );
}

export default Login;