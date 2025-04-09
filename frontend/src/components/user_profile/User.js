// UserProfile.jsx
import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";


const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const validtoken = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/me/", {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        });
        
        // console.log("this is response", response.data);
        const data = await response.data;

        // console.log(data.username);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-card">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-card">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <Navbar />
      <div className="user-profile">
        <div className="user-profile-card">
          <div className="auth-header">
            <div className="auth-logo"></div>
            {/* <h1 className="app-name">TaskMaster</h1> */}
            <h1 className="auth-title">Hy, {userData?.username || ""}</h1>
            <p className="auth-subtitle">your profile</p>
          </div>
          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="John123"
                value={userData?.username || ""}
                readOnly
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
                value={userData?.email || ""}
                readOnly
              />
            </div>

            {/* <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={userData?.password || ""}
                readOnly
              />
            </div> */}

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Profile Created Date
                </label>
              </div>
              <input
                type="text"
                id="text"
                className="form-input"
                value={userData?.created_at || ""}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;