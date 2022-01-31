import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import { AuthContext } from "../Context/AuthContext";
import { makeStyles } from "@material-ui/core";
import DashboardHome from "./DashboardHome";
import Javascript from "./Javascript";
import Python from "./Python";
import Login from "./Login";
import LoggedIn from "./loggedincomponents/LoggedIn";
import Gallery from "./loggedincomponents/Gallery";
import Assignments from "./loggedincomponents/Assignments";
import Openings from "./loggedincomponents/Openings";
import Applications from "./loggedincomponents/Applications";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100vh",
  },
  toolBar: theme.mixins.toolbar,
  contentBody: {
    flexGrow: 1,
    padding: theme.spacing(4, 3),
    backgroundColor: "#FAFAFA",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.mainContainer}>
      <Header />
      <div className={classes.contentBody}>
        <div className={classes.toolBar}></div>
        {user != null && <Redirect to="/loggedin/home" />}
        {user == null && <Redirect to="/" />}

        <Switch>
          <Route path={`/`} component={DashboardHome} exact />
          <Route path={`/javascript`} component={Javascript} />
          <Route path={`/python`} component={Python} />
          <Route path={`/login`} component={Login} exact />
          <Route path={`/loggedin/home`} component={LoggedIn} />
          <Route path={`/loggedin/gallery`} component={Gallery} />
          <Route path={`/loggedin/openings`} component={Openings} />
          <Route path={`/loggedin/applications`} component={Applications} />
          <Route path={`/loggedin/assignments`} component={Assignments} />

          {/* <Route path={`/settings`} component={Settings} /> */}
        </Switch>
      </div>
    </div>
  );
}
