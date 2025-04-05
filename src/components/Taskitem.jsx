import React, { useState } from "react";
import useTaskStore from "../store/store";
import EditTaskModal from "./edit";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);

  const toggleCompletion = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };
  

  const status = task.completed === "true" ? "Completed" : "Pending";

  const handleEditSave = (updatedTask) => {
    updateTask(task.id, updatedTask);
  };

  return (
    <>
      <li
        className={`p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition ${
          task.completed === "true"
            ? "bg-green-100 dark:bg-green-800"
            : "bg-red-100 dark:bg-red-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed === "true"}
            onChange={toggleCompletion}
            className="cursor-pointer"
          />
          <div>
            <div
              className={`text-sm font-bold mb-1 ${
                task.completed === "true"
                  ? "text-green-600 dark:text-green-300"
                  : "text-yellow-600 dark:text-yellow-300"
              }`}
            >
              {status}
            </div>
            <h3
              className={`font-semibold text-lg ${
                task.completed === "true"
                  ? "line-through text-gray-500"
                  : "text-black dark:text-white"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {task.category && (
                <span
                className={`text-sm px-2 py-1 rounded-full ${
                  task.completed ? "bg-green-500" : "bg-yellow-500"
                } text-white`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
              
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:flex-col md:flex-row">
          <button
            onClick={toggleCompletion}
            className={`${
              task.completed === "true" ? "bg-yellow-500" : "bg-green-500"
            } hover:opacity-90 text-white px-3 py-1 rounded`}
          >
            {task.completed === "true" ? "Mark as Pending" : "Mark as Completed"}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </li>

      <EditTaskModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        task={task}
        onSave={handleEditSave}
      />
    </>
  );
};

export default TaskItem;
