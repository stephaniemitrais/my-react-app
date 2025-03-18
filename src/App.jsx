import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  {token ? <Redirect to="/dashboard" /> : <Login />}
              </Route>
              <Route path="/register" component={Register} />
              <PrivateRoute path="/dashboard" component={() => <Dashboard username={username} />} />

          </Switch>
      </Router>
  );
};

export default App;
