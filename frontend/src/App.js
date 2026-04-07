import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Fetch tasks (AJAX GET)
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task (AJAX POST)
  const addTask = async () => {
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    fetchTasks();
  };

  // Delete task (AJAX DELETE)
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    });
    fetchTasks();
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
        <div className="card shadow p-4">
        <h2 className="text-center mb-4">Task Manager</h2>
        <div className="input-group mb-3">
          <input className="input-group mb-3"
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter task"
          />
          <button className="btn btn-success" onClick={addTask}>Add</button>
        </div>
      <ul className="list-group">

        {tasks.map(task => (
          <li className="list-group-item d-flex justify-content-between"
                key={task.id}>
               {task.text}
              <button className="btn btn-danger btn-sm"
                 onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;