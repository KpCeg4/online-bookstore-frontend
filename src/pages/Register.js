import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/userApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    registerUser({ name, email, password })
      .then(() => {
        setMessage("Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        const backendMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "";

        if (
          typeof backendMessage === "string" &&
          backendMessage.toLowerCase().includes("exist")
        ) {
          setMessage("This email already exists. Please login.");
        } else {
          setMessage("Registration failed");
        }
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h3 className="text-center mb-4">Register</h3>

      {message && (
        <div className="alert alert-info text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Re-type Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-100 rounded-btn mb-3">
          Register
        </button>
      </form>

      <div className="text-center">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
