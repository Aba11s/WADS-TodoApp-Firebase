function EditTaskModal({
    editingTaskId,
    editTaskInput,
    setEditTaskInput,
    saveEditedTask,
    cancelEdit,
  }) {
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
            onClick={saveEditedTask}
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
  