import React, { useEffect, useState } from "react";
import "./task.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/addtask");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    console.log(editId, "this is eddit id");

    if (editId !== null) {
      console.log(editId, "this is eddit id");
      // Update existing todo
      // navigate('/addtask');

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

        // const completedCount = response.filter(todo => todo.completed === 1).length;
        // localStorage.setItem("completed",JSON.stringify(completedCount));
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

        const responseForGet = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/todos/`,
          {
            headers: {
              authorization: `Bearer ${validtoken}`,
            },
          }
        );

        // localStorage.setItem("data",JSON.stringify(responseForGet.data.length));
        setTodos(responseForGet.data);
      } catch (err) {
        console.log("Error on create new todo", err);
      }
    }

    setInputValue("");
  };

  const handleEdit = (id) => {
    console.log("this is id", id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.description);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

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
        const completedCount = data.filter(todo => todo.completed === 1).length;
        // localStorage.setItem("data",JSON.stringify(response.data.length));
        // localStorage.setItem("completed",JSON.stringify(completedCount));
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
          {/* <button className="todo-button submit-button add-task" onClick={handleAddTask}>
            AddTask
          </button> */}
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
                  {/* <span>{todo.id} ""</span> */}
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
