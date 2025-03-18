import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/todo" /> : <LoginPage />} />
        <Route path="/todo" element={user ? <TodoPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
