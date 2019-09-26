// @ts-check
import React, { useState, useEffect } from 'react';
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

async function verifySession(setAuthComplete, setIsAuthenticated) {
  await new Promise(resolve => setTimeout(resolve, 200));
  setAuthComplete(true);
  setIsAuthenticated(true);
}

function AppHook(props) {
  const [authComplete, setAuthComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    verifySession(setAuthComplete, setIsAuthenticated);
  }, []);

  return (
    <Router>
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
      </div>
      {
        authComplete && !isAuthenticated ? <Redirect to="/login" /> : null
      }
    </Router>
  );
}

export default AppHook;
