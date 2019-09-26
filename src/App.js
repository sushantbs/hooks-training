// @ts-check
import React from 'react';
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

class App extends React.Component {
  state = {
    authComplete: false,
    isAuthenticated: null
  }

  async componentDidMount() {
    await new Promise(resolve => setTimeout(resolve, 200));

    this.setState({
      authComplete: true,
      isAuthenticated: false
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Landing} />
        </div>
        {
          this.state.authComplete && !this.state.isAuthenticated ? <Redirect to="/" /> : null
        }
      </Router>
    );
  }
}

export default App;
