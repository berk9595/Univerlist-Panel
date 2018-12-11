import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
    </Switch>
  );
};

export default Routes;
