import React, {useState} from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function setToken(jwtToken){
  sessionStorage.setItem('token', JSON.stringify(jwtToken));
}

function getToken(){
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {

  const token = getToken();

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
