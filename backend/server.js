const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
    const task = { id: Date.now(), text: req.body.text };
    tasks.push(task);
    res.json(task);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));