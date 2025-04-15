
import React from "react";
import "./dashboard.css";
import Navbar from "../navbar/Navbar";
// import { AuthProvider } from "../../helper/AuthContext";

const Dashboard = () => {
  const username = sessionStorage.getItem("username") || "User";
  // const user = { user } = AuthProvider();
  // const username = user.user?.username || "User";


  // const totalTodos = localStorage.getItem('data');


  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-header">Welcome back, {username}! 👋</h1>

        {/* Stats Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card card-blue">
            <h2>Total Tasks</h2>
            <p>{totalTodos}</p>
          </div>
          <div className="dashboard-card card-green">
            <h2>Completed</h2>
            <p>24</p>
          </div>
          <div className="dashboard-card card-red">
            <h2>Pending</h2>
            <p>8</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>
              <span>✅ Task "Build Auth Wrapper" marked as complete</span>
              <span className="time">5 mins ago</span>
            </li>
            <li>
              <span>➕ New task "TypeScript" added</span>
              <span className="time">12 mins ago</span>
            </li>
            <li>
              <span>📝 Task "Send backend response" edited</span>
              <span className="time">30 mins ago</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
