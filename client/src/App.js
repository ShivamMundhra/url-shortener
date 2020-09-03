import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Shorten from "./containers/Shorten";
import Redirect from "./containers/Redirect";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/shorten" render={(routeProps) => <Shorten />} />
        <Route exact path="/:shortId" render={(routeProps) => <Redirect />} />
      </Switch>
    </div>
  );
}

export default App;
