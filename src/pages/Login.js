import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    api.post("/api/users/login", {
      email,
      password
    })
      .then(res => {
        localStorage.clear();

        localStorage.setItem("token", res.data.token);

        const user = {
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        };

        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          setError("Invalid email or password");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h3 className="text-center mb-4">Login</h3>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary w-100 rounded-btn mb-3">
          Login
        </button>
      </form>

      <div className="text-center">
        <span>Don&apos;t have an account? </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
