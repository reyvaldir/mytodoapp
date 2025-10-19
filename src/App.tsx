import { useState } from "react";
import "./App.css";
import React from "react";
import type { Todo } from "./types/Todo";
import { v4 as uuidv4 } from "uuid";

// Function
function App() {
  // State declare for todo input
  const [todos, setTodos] = useState<Todo[]>([]);

  // State to save todo that created by users
  const [TodoList, setTodoList] = useState("");

  // State to count todo total
  const totalTodos = todos.length;
  const incompleteTodos = todos.filter((todo) => !todo.completed).length;

  // Function to make new Todo object
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent pages to reload

    // Process will stop if input value is blank
    if (TodoList.trim() === "") return;

    // To create new todo object with unique id
    const newTodo: Todo = {
      id: uuidv4(), // To make unique id (generate by uuid)
      text: TodoList, // New todo text added by users
      completed: false, // New todo is considered incomplete
    };

    // Add new Todo
    setTodos([...todos, newTodo]);

    // Clear the input field after adding a todo
    setTodoList("");
  };

  // function to delete todo based on its id
  const handleDeleteTodo = (id: string) => {
    // Filter to create a new todo list without deleted todos
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // new function to change the ‘completed’ status (toggle)
  const handleToggleComplete = (id: string) => {
    // Map the todo list to find and update the ‘completed’ status
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // User Interface
  return (
    <>
      <div className="TodoApp">
        <h1>My To-Do List</h1>

        {/* Wrap todo stats */}
        <div className="todo-stats">
          <p>Total: {totalTodos}</p>
          <p>Incomplete: {incompleteTodos}</p>
        </div>

        {/* Form to add new todo */}
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={TodoList} // Input values are bound to the TodoList state
            onChange={(e) => setTodoList(e.target.value)} // Update the state every time the user types
            placeholder="What To Do ?" // Placeholder at input
          />
          <button type="submit">Add Todo</button>
        </form>

        {/* Todo List */}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleToggleComplete(todo.id)} //Toggle also work by click todo text
              >
                {todo.text}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
