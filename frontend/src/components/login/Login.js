import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password, rememberMe });

    const userData = {
      email,
      password,
    };

    try {
      const response = await toast.promise(
        axios.post("http://localhost:5000/api/auth/login", userData),
        {
          loading: "Logging in...",
          success: "Login successful...",
          error: (err) => {
            const message =
              err.response?.data?.message ||
              err.message ||
              "Invalid email or password";
            return `Login failed: ${message}`;
          },
        }
      );

      if (toast.promise == toast.success) {
        console.log("user logged in");
      }
      console.log("Login success:", response.data);

      if (rememberMe) {
        localStorage.setItem("token", response.data.Token);
        localStorage.setItem("User", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("token", response.data.Token);
        sessionStorage.setItem("User", JSON.stringify(userData));
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"></div>
          <h1 className="app-name">TaskMaster</h1>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to access your tasks</p>
        </div>
        <Toaster position="bottom-center" />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          <div className="form-checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="checkbox-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="auth-button">
            Sign in
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
