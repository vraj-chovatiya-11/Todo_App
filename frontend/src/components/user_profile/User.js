// UserProfile.jsx
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./user.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Swal from "sweetalert2";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dateOnly = new Date(userData?.created_at).toLocaleDateString("en-GB");

  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    // 1. checking if todo is exists
    try {
      const validtoken = sessionStorage.getItem("token");
      const hasTodo = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/todos/`,
        {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        }
      );
      // Check if any tasks exist
      if (hasTodo.data.length > 0) {
        toast.error(
          "You must delete all your tasks before deleting your account."
        );
        return;
      }
    } catch (error) {
      console.log("Error on Todo count", error);
    }

    // 2. Proceed with deletion
    try {
      const validtoken = sessionStorage.getItem("token");
      const response = await toast.promise(
        axios.delete(`${process.env.REACT_APP_BACKEND_API}/auth/${id}`, {
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
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("User");
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log("Error on depete todo.!", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      // Switch to edit mode
      setIsEditing(true);
      toast("Now you can Edit.!", {
        icon: "👏",
      });
    } else {
      try {
        const token = sessionStorage.getItem("token");

        const response = await toast.promise(
          axios.put(`${process.env.REACT_APP_BACKEND_API}/auth/`, userData, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),
          {
            loading: "Updating...",
            success: "User Update Successfully...",
            error: (err) => {
              const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong";
              return `Update Failed : ${message}`;
            },
          }
        );
        console.log(response, "response");
        // alert("Profile updated successfully!");
        setIsEditing(false); // back to view mode
      } catch (err) {
        console.log("failed to update profile");
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchUserData = async () => {
    try {
      const validtoken = sessionStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/auth/me/`,
        {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        }
      );

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
                readOnly={!isEditing}
                onChange={handleChange}
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
                readOnly={!isEditing}
                onChange={handleChange}
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
              <button className="p-btn edit-btn" onClick={handleEdit}>
                {isEditing ? "Update Profile" : "Edit Profile"}
              </button>
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
