import React, { useEffect } from "react";
import useTaskStore from "../store/store";
import TaskItem from "./Taskitem";

const TaskList = () => {
  const { tasks, loadTasks } = useTaskStore();

  useEffect(() => {
    loadTasks(); // Load tasks from localForage on mount
  }, []);

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
