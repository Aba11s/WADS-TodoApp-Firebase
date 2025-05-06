import { deleteTask } from "../api";  // Import the API function

function TaskItem({ task, onDelete, onEdit }) {

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);  // Call the API to delete the task
      onDelete(task.id);  // Update the task list in parent component
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <li className="flex justify-between items-center bg-gray-200 p-2 rounded">
      {/* Task Text */}
      <span>{task.text}</span>

      {/* Buttons */}
      <div className="space-x-2">
        <button
          className="text-blue-500"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
        <button
          className="text-red-500"
          onClick={handleDelete}  // Use the handleDelete function here
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
