import "./App.css";
import Login from "./components/login/Login";
// import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbaord from "./components/dashboard/Dashboard";
import Task from "./components/task/Task";
import Calender from "./components/calender/Calender";
import Register from "./components/register/Register";
import User from "./components/user_profile/User";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            exact
            element={
              <PrivateRoute>
                <Dashbaord />
              </PrivateRoute>
            }
          />
          <Route
            path="/mytask"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }
          />
          <Route
            path="/calender"
            element={
              <PrivateRoute>
                <Calender />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
