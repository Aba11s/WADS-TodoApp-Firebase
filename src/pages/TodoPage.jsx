import { useState,useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";

//firebase
import { db } from "../firebase";
import { collection, addDoc, Timestamp, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskInput, setEditTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks from firebase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, "tasks");
        const snapshot = await getDocs(tasksRef);
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id, // Use Firestore doc ID as the unique identifier
          ...doc.data(), // Get task data
        }));
        setTasks(taskList); // Update state with fetched tasks
        
      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures this runs only on component mount


  // Add a new task
  const addTask = async () => {
    if (taskInput.trim()) {
      try {
        // Save to Firestore with 'text' field and auto-generated 'id'
        const tasksRef = collection(db, "tasks");
        const docRef = await addDoc(tasksRef, {
          text: taskInput,
          createdAt: Timestamp.fromDate(new Date()), // Add timestamp
        });

        // Update local state with the Firestore document ID
        const newTask = { id: docRef.id, text: taskInput };  // Use Firestore generated ID
        setTasks([...tasks, newTask]);
        setTaskInput(""); // Clear input field
      } catch (error) {
        console.error("Cannot add task to Firestore", error);
      }
    }
  };

  // Start editing a task
  const startEditingTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskInput(taskToEdit.text);
    setEditingTaskId(taskId);
  };

  // Save the edited task
  const saveEditedTask = async () => {
    // Update local state
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editTaskInput } : task
      )
    );

    // Update Firestore
    const taskRef = doc(db, "tasks", editingTaskId); // Get Firestore document reference
    try {
      await updateDoc(taskRef, {
        text: editTaskInput, // Update the task text in Firestore
      });
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }

    // Clear editing state
    setEditingTaskId(null);
    setEditTaskInput("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskInput("");
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    // Remove from local state
    setTasks(tasks.filter((task) => task.id !== taskId));

    // Delete from Firestore
    const taskRef = doc(db, "tasks", taskId); // Get Firestore document reference
    try {
      await deleteDoc(taskRef); // Delete task from Firestore
    } catch (error) {
      console.error("Error deleting task from Firestore:", error);
    }
  };


  return (
    <div className="min-h-screen w-screen bg-blue-200 flex justify-center items-center">
      {/* Main container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl font-semibold mb-4 text-center">Tasks</h1>

        {/* Add Task Component */}
        <AddTask taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} />

        {/* Task List Component */}
        <TaskList tasks={tasks} onDelete={deleteTask} onEdit={startEditingTask} />

        {/* Edit Task Modal */}
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

export default App;
