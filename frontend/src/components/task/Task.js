import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const Task = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

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
          `http://localhost:5000/api/todos/${editId}`,
          updatedData,{
            headers: {
                authorization: `Bearer ${validtoken}`,
            },
          }
        );
      } catch (err) {
        console.log("Error on update todo", err);
      }
      console.log("this is update id", editId);

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
          "http://localhost:5000/api/todos/",
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
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    
    try{
        const validtoken = sessionStorage.getItem("token");
        const response = await axios.delete(`http://localhost:5000/api/todos/${id}`,{
            headers: {
                authorization: `Bearer ${validtoken}`
            },
        });
        console.log("Todo deleted successfully", response);
    }catch(err){
        console.log("Error on depete todo.!", err);
    }
    console.log("delete id", id);
    setTodos(deleteTodo);
  };

  const toggleComplete = (id) => {
    console.log(todos.completed, "break");
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const validtoken = sessionStorage.getItem("token");
        // console.log(validtoken, "sdfasdfasdfadf")
        const response = await axios.get("http://localhost:5000/api/todos/", {
          headers: {
            authorization: `Bearer ${validtoken}`,
          },
        });
        const data = response.data;
        setTodos(data);
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
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
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
