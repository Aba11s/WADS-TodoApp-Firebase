

function AddTask({ taskInput, setTaskInput, addTask }) {
    return (
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    );
  }
  
  export default AddTask;
  