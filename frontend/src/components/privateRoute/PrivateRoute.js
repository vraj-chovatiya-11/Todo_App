import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  // return token ? children : <Navigate to="/" replace />;
  if (!token) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateRoute;
