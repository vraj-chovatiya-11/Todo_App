import React from "react";
import "./dashboard.css";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <div className="dashboard">
        <h1>Welcome to Taskmaster</h1>
      </div>
    </>
  );
};

export default Dashboard;
