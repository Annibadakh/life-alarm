import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../utils/localStorageUtils";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No tasks yet. Add some!</p>;
  }

  return (
    <div className="mt-6 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">All Tasks</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}
