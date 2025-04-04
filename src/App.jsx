import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./pages/taskmanager";
import LoginPage from "./pages/loginpage"; // ✅ Import the login page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/login" element={<LoginPage />} /> {/* ✅ Add this line */}
      </Routes>
    </Router>
  );
};

export default App;
