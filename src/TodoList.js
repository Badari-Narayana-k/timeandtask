import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl mb-4">Tasks</h1>
      <div className="flex">
        <input
          type="text"
          className="flex-1 rounded-l border border-gray-300 p-2"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white border border-gray-300 p-2 rounded mb-2"
          >
            <span>{todo}</span>
            <button
              className="white"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
