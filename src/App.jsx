import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import TaskManager from "./pages/taskmanager";
import Login from "./pages/loginpage";

// 🔒 Redirect if already logged in and currently on /login page
const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname === "/login") {
        console.log("User already logged in, redirecting to /");
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AuthRedirect />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default App;
