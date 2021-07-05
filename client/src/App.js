import React from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
