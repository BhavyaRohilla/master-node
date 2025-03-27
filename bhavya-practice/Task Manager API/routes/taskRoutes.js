const express = require("express");
const routes = require("express").Router();
const tasksData = require("../data/data.json");
const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, "../data/data.json");

const readTasks = async () => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data).tasks;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const writeTasks = async (tasks) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify({ tasks }, null, 2));
  } catch (err) {
    console.log(err);
  }
};

routes.get("/tasks/:id", async (req, res) => {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).send("Task not found");
  } else {
    res.status(200).send(task);
  }
});

routes.po;
st("/tasks", async (req, res) => {
  const tasks = await readTasks();
  const { name, description, status } = req.body;
  const newTask = {
    id: Date.now(),
    name,
    description,
    status,
  };
  tasks.push(newTask);

  await writeTasks(tasks);
  res.status(201).send(newTask);
});

routes.get("/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = routes;
