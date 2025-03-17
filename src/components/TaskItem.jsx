function TaskItem({ task, onDelete, onEdit }) {
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
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
  
  export default TaskItem;
  