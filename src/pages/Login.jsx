import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styling

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.name);
        history.push("/dashboard");
      } else {
        alert(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" {...register("email")} />
            <p className="error-text">{errors.email?.message}</p>
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" {...register("password")} />
            <p className="error-text">{errors.password?.message}</p>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
