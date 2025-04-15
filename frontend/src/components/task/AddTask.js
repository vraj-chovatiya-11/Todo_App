import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleViewTask = () => {
    navigate("/mytask");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    if (editId !== null) {
      // Update existing todo
      const updateTodo = todos.map((todo) =>
        todo.id === editId ? { ...todo, description: inputValue } : todo
      );

      const updatedData = { description: inputValue };

      try {
        const validtoken = sessionStorage.getItem("token");
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_API}/todos/${editId}`,
          updatedData,
          {
            headers: {
              authorization: `Bearer ${validtoken}`,
            },
          }
        );
        navigate("/mytask");
      } catch (err) {
        console.log("Error on update todo", err);
      }

      setTodos(updateTodo);
      setEditId(null);
    } else {
      // Add new todo
      const newTodo = {
        description: inputValue,
        completed: false,
      };

      try {
        const validtoken = sessionStorage.getItem("token");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/todos/`,
          newTodo,
          {
            headers: {
              authorization: `Bearer ${validtoken}`,
            },
          }
        );

        console.log("what is response", response);
        navigate("/mytask");
      } catch (err) {
        console.log("Error on create new todo", err);
      }

      setTodos([...todos, newTodo]);
    }

    setInputValue("");
  };

  return (
    <>
      <div className="simple-todo-container">
        <Navbar />
        <div className="todo-content">
          <h1 className="todo-title">My Todo List</h1>

          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="todo-input"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" className="todo-button submit-button">
              {editId !== null ? "Update" : "Add"}
            </button>
            <button
              className="todo-button submit-button view-todo"
              onClick={handleViewTask}
            >
              ViewTodos
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
