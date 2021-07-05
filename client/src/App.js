import React, {useState} from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {

  const [token, setToken] = useState();

  if(!token){
    return <Login setToken={token} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
