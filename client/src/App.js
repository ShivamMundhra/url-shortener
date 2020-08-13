import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Redirect from "./containers/Redirect";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routeProps) => <Home />} />
        <Route exact path="/:shortId" render={(routeProps) => <Redirect />} />
      </Switch>
    </div>
  );
}

export default App;
