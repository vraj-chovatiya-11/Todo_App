import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [editDescription, setEditDescription] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
      } catch (err) {
        console.log("Error on create new todo", err);
      }

      setTodos([...todos, newTodo]);
    }

    setInputValue("");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.description);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    const deleteTodo = todos.filter((todo) => todo.id !== id);

    try {
      const validtoken = sessionStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/todos/${id}`,
        {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        }
      );
      console.log("Todo deleted successfully", response);
    } catch (err) {
      console.log("Error on depete todo.!", err);
    }
    setTodos(deleteTodo);
  };

  const toggleComplete = async (id) => {
    try {
      const validToken = sessionStorage.getItem("token");

      // Get the current todo's completed state
      const currentTodo = todos.find((todo) => todo.id === id);
      const newCompletedState = !currentTodo.completed;

      // Update backend
      await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/todos/${id}`,
        {
          description: currentTodo.description,
          completed: newCompletedState ? 1 : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
          },
        }
      );

      // Update local state
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: newCompletedState } : todo
      );
      setTodos(updatedTodos);
    } catch (err) {
      console.error("Error in toggleComplete:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const validtoken = sessionStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/todos/`,
          {
            headers: {
              authorization: `Bearer ${validtoken}`,
            },
          }
        );
        const data = response.data;
        setTodos(data);

        // Log each todo with its completion status
        // data.forEach((todo) => {
        //   console.log(
        //     `Todo: ${todo.id}, Description: ${todo.description}, Completed: ${todo.completed}`
        //   );
        // });

        const dataa = response.data?.description;
        console.log(data);
      } catch (err) {
        console.log("Fetching data from backend Error", err);
      }
    };

    fetchData();
  }, []);

  return (
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
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">No todos yet. Add one above!</div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-item-content">
                  <div>
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                  </div>
                  <span className="todo-text">{todo.title}</span>
                  <br></br>
                  <span className="todo-text">{todo.description}</span>
                </div>
                <div className="todo-actions">
                  <button
                    className="todo-button edit-button"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="todo-button delete-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
