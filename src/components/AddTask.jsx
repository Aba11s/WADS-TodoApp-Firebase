import { useState } from "react";
import { addTask } from "../api";  // Import the API function

function AddTask({ taskInput, setTaskInput, setTasks }) {
  const [error, setError] = useState("");

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        const newTask = { text: taskInput, userId: "userId_placeholder" };  // Replace with actual user logic
        const response = await addTask(newTask);  // Add the task using the API function
        
        // Update the task list state with the new task
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTaskInput(""); // Clear input field
      } catch (error) {
        setError("Failed to add task.");
      }
    } else {
      setError("Task cannot be empty.");
    }
  };

  return (
    <div className="mb-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button
        className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
