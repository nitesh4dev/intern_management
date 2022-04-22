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

        {/* localhost:3000 or the website's main domain renders DashboardRoutes */}
        <Route path={"/"} component={DashboardRoutes} />
        {/* <Route path={`/dashboard`} component={DashboardRoutes} /> */}
      </Switch>
    </Router>
  );
}
