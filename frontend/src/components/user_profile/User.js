// UserProfile.jsx
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./user.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateOnly = new Date(userData?.created_at).toLocaleDateString("en-GB");

  const navigate = useNavigate();
  const userId = userData?.id;
  console.log(userId);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to Delete Account.?"
    );
    if (!confirmDelete) return;

    try {
      const validtoken = sessionStorage.getItem("token");
      const response = await toast.promise(
        axios.delete(`http://localhost:5000/api/auth/${id}`, {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        }),
        {
          loading: "Deleting...",
          success: "User Deleted Successfully...",
          error: (err) => {
            const message =
              err.response?.data?.message ||
              err.message ||
              "Something went wrong";
            return `Delete user failed: ${message}`;
          },
        }
      );

      console.log("User Deleted Successfully...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log("Error on depete todo.!", err);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    alert("handle Edit button");
  }

  const fetchUserData = async () => {
    try {
      const validtoken = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/me/", {
        headers: {
          authorization: `Bearer ${validtoken}`,
        },
      });

      const data = await response.data;
      console.log("current date", dateOnly);

      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    return () => window.removeEventListener("click", handleDelete);
  }, []);

  // console.log(userData?.created_at);
  // console.log("object")
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
      <Toaster position="bottom-center" />
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
                value={dateOnly || ""}
                readOnly
              />
            </div>
            <div className="profile-btn">
              <button className="p-btn edit-btn"  onClick={handleEdit}>Edit Profile</button>
              <button className="delete-btn p-btn" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
