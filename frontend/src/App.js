import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Task from "./components/task/Task";
import Calender from "./components/calender/Calender";
import User from "./components/user_profile/User";
import AddTask from "./components/task/AddTask";

import PublicLayout from "./components/privateRoute/PublicRoute";
import PrivateLayout from "./components/privateRoute/PrivateRoute";
import Footer from "./components/footer/Footer";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mytask" element={<Task />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/profile" element={<User />} />
            <Route path="/addtask" element={<AddTask />} />
          </Route>
        </Routes>
        {/* ✅ Show footer only if logged in */}
        {token && <Footer />}
      </div>
    </Router>
  );
}

export default App;
