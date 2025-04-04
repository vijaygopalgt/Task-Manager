// src/pages/taskmanager.jsx
import React, { useEffect, useState } from "react";
import TaskForm from "../components/Taskform";
import FilterButtons from "../components/Filterbutton";
import TaskList from "../components/Tasklist";
import localforage from "localforage";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localforage.getItem("tasks").then((savedTasks) => {
      if (savedTasks) setTasks(savedTasks);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ✅ Filter tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <button
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* ✅ Task form to add new tasks */}
        <TaskForm tasks={tasks} setTasks={setTasks} />

        {/* ✅ Filter Buttons */}
        <FilterButtons setFilter={setFilter} activeFilter={filter} />

        {/* ✅ Pass filtered tasks to TaskList */}
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskManager;
