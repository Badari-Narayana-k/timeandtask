// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import Stopwatch from './Stopwatch';
import CountdownTimer from './CountdownTimer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/stopwatch">Test of Endurance</Link>
            </li>
            <li>
              <Link to="/countdown-timer">Focus mode</Link>
            </li>
          </ul>
        </nav>
        </div>
        <div className='App-Body'>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/countdown-timer" element={<CountdownTimer />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
