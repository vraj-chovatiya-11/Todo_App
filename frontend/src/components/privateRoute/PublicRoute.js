import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = sessionStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;