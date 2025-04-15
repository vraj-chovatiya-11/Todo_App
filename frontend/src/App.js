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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
