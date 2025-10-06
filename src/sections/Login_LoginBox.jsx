import React from "react";
import '../assets/style.css';

function LoginBox(){
    return(
        <div className="login-box card shadow">
            <h3 className="text-center mb-4 fw-bold">Login</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn mt-4">Login</button>
            </form>
            <div className="text-center mt-4">
                <small>
                    Don’t have an account? <a href="/register">Register</a>
                </small>
            </div>
        </div>
    );
}

export default LoginBox;