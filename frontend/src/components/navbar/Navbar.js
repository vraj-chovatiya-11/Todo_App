import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loggedOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log("User Logged Out");
    navigate('/');
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-section">
              {/* if want to import img you can  */}
              <span className="app-name">TaskMaster</span>
            </div>

            <nav className="desktop-nav">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/mytask" className="nav-link">
                My Tasks
              </Link>
              <Link to="/calender" className="nav-link">
                Calender
              </Link>
            </nav>

            <div className="profile-section">
              <Link to="/login">
                {/* <button className="logout-btn btn">LogOut</button> */}
              </Link>
              <Link to="/register">
                {/* <button className="register-btn btn">Register</button> */}
              </Link>
              <div className="dropup">
                <button className="dropbtn btn">Profile</button>
                <div className="dropup-content">
                  <Link to="/profile">ViewProfile</Link>
                  {/* <a href="#">EditProfile</a> */}
                  <a href="#" onClick={loggedOut}>Logout</a>
                </div>
              </div>
            </div>

            <button onClick={toggleMenu} className="menu-btn">
              <svg
                className="menu-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <nav className="mobile-nav">
              <Link to="/dashboard" className="mobile-nav-link">
                Dashboard
              </Link>
              <Link to='/mytask' className="mobile-nav-link">
                My Tasks
              </Link>
              <Link to='/calender' className="mobile-nav-link">
                Calendar
              </Link>
              <div className="divider"></div>
              <div className="mobile-profile">
                {/* <div className="user-info">
                  <div className="avatar">JS</div>
                  <span className="user-name">John Smith</span>
                </div> */}
                <button className="notification-btn">
                  <svg
                    className="menu-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
