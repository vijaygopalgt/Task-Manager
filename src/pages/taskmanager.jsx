// src/pages/taskmanager.jsx
import React, { useEffect, useState } from "react";
import TaskFormModal from "../components/Taskform";
import FilterButtons from "../components/Filterbutton";
import TaskList from "../components/Tasklist";
import useTaskStore from "../store/store";

const TaskManager = () => {
  const { tasks, loadTasks } = useTaskStore();
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    loadTasks(); // Load tasks from localForage only once
  }, [loadTasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <div className="flex gap-4 items-center">
            <TaskFormModal />
            <button
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <FilterButtons setFilter={setFilter} activeFilter={filter} />
        <TaskList tasks={tasks} filter={filter} />
      </div>
    </div>
  );
};

export default TaskManager;
