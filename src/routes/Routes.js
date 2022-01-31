import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import DashboardRoutes from "./DashboardRoutes";

export default function Routes() {
  
  return (
    <Router>

      <Switch>
        {/* <Route path={`/login`} component={Login} exact /> */}
        <Route path={"/"} component={DashboardRoutes} exact />
        {/* <Route path={`/dashboard`} component={DashboardRoutes} /> */}
      </Switch>
    </Router>
  );
}
