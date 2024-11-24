const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//API 1-

function addTasks(taskId, text, priority, tasks) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTasks(taskId, text, priority, tasks);
  res.json(result);
});

//API 2-

app.get('/tasks', (req, res) => {
  let result = tasks;
  res.json(result);
});

//API 3-
function sortPriority(prior1, prior2) {
  return prior1.priority - prior2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortPriority);
  res.json(result);
});

//API 4-

function updatePriority(tak, taskId, priority) {
  if (tak.taskId === taskId) {
    tak.priority = priority;
  }
  return tak;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tak) => updatePriority(tak, taskId, priority));
  res.json(result);
});

//API 5-

function updateText(tak, taskId, text) {
  if (tak.taskId === taskId) {
    tak.text = text;
  }
  return tak;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = tasks.filter((tak) => updateText(tak, taskId, text));
  res.json(result);
});

//API 6-

function deleteTask(tak, taskId) {
  return tak.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((tak) => deleteTask(tak, taskId));
  res.json(result);
});

//API 7-

function filterTaskByPriority(tak, priority) {
  return tak.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tak) => filterTaskByPriority(tak, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
