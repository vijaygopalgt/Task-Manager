
import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithEmailPassword,
} from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password);
      console.log("Redirecting to /task");
      navigate("/task"); // ✅ FIXED PATH
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/task"); // ✅ FIXED PATH
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
