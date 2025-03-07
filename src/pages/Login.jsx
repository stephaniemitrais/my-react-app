import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css"

function Login({ setUsername }) {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setUsername(name);
    history.push("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;