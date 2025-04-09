import React from "react";
import Navbar from "../navbar/Navbar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Navbar />
        <h1>Welcome to Taskmaster</h1>
      </div>
    </>
  );
};

export default Dashboard;
