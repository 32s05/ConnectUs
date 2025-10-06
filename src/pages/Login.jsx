import React from "react";
import '../assets/style.css';
import LoginBox from "../sections/Login_LoginBox";
import Logo from "../sections/Login_Logo";

const Login = () => {
  return (
    <div className="body">
        <div className="container py-0">
        <div className="row align-items-center justify-content-center g-0">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <Logo />
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <LoginBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
