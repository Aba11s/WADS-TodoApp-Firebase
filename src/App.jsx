import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";  // Removed auth useEffect
import TodoPage from "./pages/TodoPage";  // Directly import TodoPage without LoginPage

function App() {
  // Directly skip the user state and navigate to TodoPage
  return (
    <Router>
      <Routes>
        {/* Directly render TodoPage without checking for auth */}
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
