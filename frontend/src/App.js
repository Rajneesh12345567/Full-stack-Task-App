import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try { const res = await axios.get('http://localhost:5000/tasks'); setTasks(res.data); } catch(e){ console.error(e); }
  };
  const addTask = async (e) => { e.preventDefault(); if(!title.trim()) return; const res = await axios.post('http://localhost:5000/tasks', { title }); setTasks(prev => [...prev, res.data]); setTitle(''); };
  const deleteTask = async (id) => { await axios.delete(`http://localhost:5000/tasks/${id}`); setTasks(prev => prev.filter(t => t.id !== id)); };

  return (
    <div className="container">
      <header><h1>Task Manager</h1><p>Simple full-stack example by Rajneesh</p></header>
      <form onSubmit={addTask} className="add-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task title" />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id}><span>{t.title}</span><button onClick={() => deleteTask(t.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
