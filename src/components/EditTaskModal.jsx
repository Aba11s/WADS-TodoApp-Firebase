import { useState } from "react";
import { updateTask } from "../api";  // Import the API function

function EditTaskModal({
  editingTaskId,
  editTaskInput,
  setEditTaskInput,
  saveEditedTask,
  cancelEdit,
}) {
  const handleSaveChanges = async () => {
    try {
      await updateTask(editingTaskId, { text: editTaskInput });  // Call the backend API to update the task
      saveEditedTask();  // Update local state after successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    editingTaskId && (
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={editTaskInput}
          onChange={(e) => setEditTaskInput(e.target.value)}
        />
        <button
          className="w-full mt-2 p-2 bg-green-500 text-white rounded"
          onClick={handleSaveChanges}  // Use the updated save function
        >
          Save Changes
        </button>
        <button
          className="w-full mt-2 p-2 bg-gray-500 text-white rounded"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      </div>
    )
  );
}

export default EditTaskModal;
