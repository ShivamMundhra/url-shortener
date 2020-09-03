import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Shorten from "./containers/Shorten";
import Redirect from "./containers/Redirect";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routeProps) => <Home />} />
        <Route exact path="/shorten" render={(routeProps) => <Shorten />} />
        <Route exact path="/login" render={(routeProps) => <Login />} />
        <Route exact path="/signup" render={(routeProps) => <Signup />} />
        <Route
          exact
          path="/redirect/:shortId"
          render={(routeProps) => <Redirect />}
        />
      </Switch>
    </div>
  );
}

export default App;
