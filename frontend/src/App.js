import "./App.css";
import Login from "./components/login/Login";
// import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbaord from "./components/dashboard/Dashboard";
import Task from "./components/task/Task";
import Calender from "./components/calender/Calender";
import Register from "./components/register/Register";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" exact element={<Dashbaord />} />
          <Route path="/mytask" element={<Task />} />
          <Route path="/calender" element={<Calender />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
