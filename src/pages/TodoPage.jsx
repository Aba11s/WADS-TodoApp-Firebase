import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";

import {
  getTasks,
  addTask as apiAddTask,
  updateTask,
  deleteTask as apiDeleteTask,
} from "../api";

function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskInput, setEditTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        const res = await apiAddTask({ text: taskInput });
        setTasks([...tasks, res.data]);
        setTaskInput("");
      } catch (err) {
        console.error("Failed to add task:", err);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const startEditingTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditTaskInput(task.text);
      setEditingTaskId(id);
    }
  };

  const saveEditedTask = async () => {
    try {
      const res = await updateTask(editingTaskId, { text: editTaskInput });
      setTasks(tasks.map(task => (task.id === editingTaskId ? res.data : task)));
      setEditingTaskId(null);
      setEditTaskInput("");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskInput("");
  };

  const handleSignOut = () => {
    // Temporary placeholder
    alert("Sign out clicked. Replace with real auth logic.");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-screen bg-blue-200 flex flex-col justify-center items-center">
      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>

      {/* Main Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl font-semibold mb-4 text-center">Tasks</h1>

        {/* Add Task */}
        <AddTask
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={handleAddTask}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={startEditingTask}
        />

        {/* Edit Modal */}
        <EditTaskModal
          editingTaskId={editingTaskId}
          editTaskInput={editTaskInput}
          setEditTaskInput={setEditTaskInput}
          saveEditedTask={saveEditedTask}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
}

export default TodoPage;
