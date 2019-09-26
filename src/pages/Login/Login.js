// @ts-check
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

function LoginHook(props) {
  const [error, setError] = useState(null);
  const [authComplete, setAuthComplete] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticateUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (username === "user" && password === "password") {
      setAuthComplete(true);
    }
  }

  return (
    <div className="login-form">
      <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="button" value="Login" onClick={e => authenticateUser()} />
      {
        error ? <div className="error">{error}</div> : null
      }
      {
        authComplete ? <Redirect to="/" /> : null
      }
    </div>
  )
}

export default LoginHook;