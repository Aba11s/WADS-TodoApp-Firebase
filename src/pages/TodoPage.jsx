import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";
import { useNavigate } from "react-router-dom";

// Firebase
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskInput, setEditTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  // Fetching Tasks
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Fetching tasks for user:", user.uid);
  
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("uid", "==", user.uid)); // Filter by UID
  
        const unsubscribeTasks = onSnapshot(q, (snapshot) => {
          const taskList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched tasks:", taskList); // Debugging
          setTasks(taskList);
        });
  
        return () => unsubscribeTasks();
      } else {
        console.log("User signed out, clearing tasks.");
        setTasks([]); // Clear tasks on logout
      }
    });
  
    return () => unsubscribeAuth();
  }, []);
  

  // Sign Out Function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTasks([]); // Clear tasks on logout
      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  

  // Add a new task
  const addTask = async () => {
    if (taskInput.trim()) {
      if (!auth.currentUser) {
        console.error("No user logged in!");
        return;
      }
  
      try {
        const tasksRef = collection(db, "tasks");
        const docRef = await addDoc(tasksRef, {
          text: taskInput,
          createdAt: Timestamp.fromDate(new Date()),
          uid: auth.currentUser.uid,
        });
  
        setTasks([...tasks, { id: docRef.id, text: taskInput, uid: auth.currentUser.uid }]);
        setTaskInput("");
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
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editTaskInput } : task
      )
    );

    try {
      await updateDoc(doc(db, "tasks", editingTaskId), {
        text: editTaskInput,
      });
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }

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
    setTasks(tasks.filter((task) => task.id !== taskId));

    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task from Firestore:", error);
    }
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

export default TodoPage;
