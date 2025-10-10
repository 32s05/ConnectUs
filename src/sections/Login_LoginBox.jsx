import React from "react";
import '../assets/style.css';

function LoginBox({ email, password, setEmail, setPassword, handleSubmit, message }) {
  return (
    <div className="login-box card shadow">
      <h3 className="text-center mb-4 fw-bold">Login</h3>


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn mt-4">Login</button>
      </form>

      {/* ✅ Display message if login fails */}
      {message && <p className="text-danger text-center mt-3">{message}</p>}

      <div className="text-center mt-4">
        <small>
          Don’t have an account? <a href="/Registration">Register</a>
        </small>
      </div>
    </div>
  );
}

export default LoginBox;
