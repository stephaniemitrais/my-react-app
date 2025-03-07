import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddContact from "./components/AddContact";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <div> 
        <Switch>
          <Route exact path="/">
            <Login setUsername={setUsername} />
          </Route>
          <Route path="/dashboard">
            <Dashboard username={username} />
          </Route>
          <Route path="/add-contact">
            <AddContact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;