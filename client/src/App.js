import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Shorten from "./containers/Shorten";
import RedirectComponent from "./containers/RedirectComponent";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Navbar from "./containers/Navbar";
import History from "./containers/History";
import Cursor from "./components/Cursor";
function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    axios
      .post("/api/v1/users/isloggedin")
      .then((data) => {
        setUser(data.data.user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setUser(null);
        console.log(error);
      });
  }, []);

  const login = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };
  const logout = () => {
    axios
      .post("/api/v1/users/logout")
      .then((data) => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
      });
  };
  return (
    <div className="App">
      {!accepted ? (
        <div className="overlay">
          <div className="dailog-box">
            <div>
              {" "}
              This app is currently not optimised for small screens. Please use
              a Laptop or a Desktop
            </div>
            <button onClick={() => setAccepted(true)}>Close</button>
          </div>
        </div>
      ) : null}
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        login={login}
        logout={logout}
      />
      <Switch>
        <Route exact path="/">
          <Redirect to="home" />
        </Route>
        <Route exact path="/home" render={(routeProps) => <Home />} />
        <Route exact path="/shorten" render={(routeProps) => <Shorten />} />
        <Route
          exact
          path="/login"
          render={(routeProps) => (
            <Login
              isLoggedIn={isLoggedIn}
              user={user}
              login={login}
              logout={logout}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(routeProps) => (
            <Signup
              isLoggedIn={isLoggedIn}
              user={user}
              login={login}
              logout={logout}
            />
          )}
        />
        <Route
          exact
          path="/redirect/:shortId"
          render={(routeProps) => <RedirectComponent />}
        />
        <Route exact path="/history">
          {!isLoggedIn ? <Redirect to="/login" /> : <History user={user} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
