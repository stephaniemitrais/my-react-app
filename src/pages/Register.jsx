import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // ✅ Ensure the new CSS is applied

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", phone: "", password: "" });
    const history = useHistory();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/auth/register", user)
            .then(() => {
                alert("Registration successful! Please log in.");
                history.push("/");
            })
            .catch(error => {
                console.error("Error registering user:", error);
                alert("Failed to register. Please try again.");
            });
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn save">Register</button>
                    <button type="button" className="btn cancel" onClick={() => history.push("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
