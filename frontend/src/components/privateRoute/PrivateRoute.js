import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  // return token ? children : <Navigate to="/" replace />;
  if (!token) return <Navigate to="/" replace />;
  return (
    <>
      <div className="private-wrapper">
        <Outlet />
      </div>
      <Footer /> 
    </>
  );
};

export default PrivateRoute;
