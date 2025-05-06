import { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import { getTasks } from "../api";  // Import the API function

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();  // Fetch tasks from the backend
        setTasks(response.data);  // Set the tasks state with the fetched data
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);  // Empty dependency array to run once when the component mounts

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));  // Remove task from state after deleting
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}  // Pass the handleDelete function
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;

