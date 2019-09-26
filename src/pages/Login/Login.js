// @ts-check
import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  state = {
    error: null,
    authComplete: false,
    username: "",
    password: ""
  }

  async authenticateUser() {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (this.state.username === "user" && this.state.password === "password") {
      this.setState({
        authComplete: true
      })
    }
  }

  updateState(stateVar, stateVal) {
    this.setState({
      ...this.state,
      [stateVar]: stateVal
    })
  }

  render() {
    return (
      <div className="login-form">
        <input type="text" placeholder="username" value={this.state.username} onChange={e => this.updateState("username", e.target.value)} />
        <input type="password" placeholder="password" value={this.state.password} onChange={e => this.updateState("password", e.target.value)} />
        <input type="button" value="Login" onClick={e => this.authenticateUser()} />
        {
          this.state.error ? <div className="error">{this.state.error}</div> : null
        }
        {
          this.state.authComplete ? <Redirect to="/" /> : null
        }
      </div>
    )
  }
}

export default Login