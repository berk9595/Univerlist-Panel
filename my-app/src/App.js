import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Header from "./Header";
import React, { Fragment } from "react";
import Deneme from './Deneme'
const renderComponent = (MyComponent, DefaultComponent) => {
  return MyComponent !== undefined ? MyComponent : DefaultComponent;
};

const MyRoute = ({
  component: MyComponent,
  headerComponent,
  footerComponent,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Fragment>
        {renderComponent(headerComponent, <Header />)}
        <MyComponent {...props} />
      </Fragment>
    )}
  />
);
const App = () => (
  <Router>
    <Switch>
      <MyRoute
        headerComponent={<Header />}
        path="/home"
        exact
        component={Home}
      />
      <MyRoute headerComponent={null} path="/" exact component={Login} />
      <MyRoute headerComponent={null} path="/den" exact component={Deneme} />
    </Switch>
  </Router>
);

export default App;
