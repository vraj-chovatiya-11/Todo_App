import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { configure } from "@testing-library/dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await toast.promise(
        axios.post("http://localhost:5000/api/auth/register", userData),
        {
          loading: "Registering...",
          success: "Registration successful!",
          error: (err) => {
            const message =
              err.response?.data?.errors?.password ||
              err.response?.data?.message ||
              err.message ||
              "Something went wrong";
            return `Registration failed: ${message}`;
          },
        }
      );
      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log("Server response:", response.data);
      setTimeout(() => {
          navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response) {
        console.log("Server responded with error:", err.response.data);
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Error setting up request:", err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"></div>
          <span className="app-name">TaskMaster</span>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Start managing your tasks effectively</p>
        </div>
        <Toaster position="bottom-center" />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="John123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* <div className="form-checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="checkbox-label">
              I accept the{" "}
              <a href="#" className="auth-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="auth-link">
                Privacy Policy
              </a>
            </label>
          </div> */}

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
