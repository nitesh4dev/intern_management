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
import AssignmentDetails from "./loggedincomponents/AssignmentDetails";
import AllOpenings from "./AllOpenings";
import SelectedLogin from "./SelectedLogin";
import SelectedSignup from "./SelectedSignup";
import MyProfile from "./loggedincomponents/MyProfile";
import Document from "./loggedincomponents/Document";
import ExitForm from "./loggedincomponents/ExitForm";
import Training from "./Training";
import TrainingVidoes from "./loggedincomponents/TrainingVidoes";
import TrainingLessons from "./loggedincomponents/TrainingLessons";
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
        {user == null && <Redirect to="/selected-signup" />}
        <Switch>
          <Route path={`/`} component={DashboardHome} exact />
          <Route path={`/login`} component={Login} exact />
          <Route path={`/selected-login`} component={SelectedLogin} exact />
          <Route path={"/selected-signup"} component={SelectedSignup} exact />
          <Route path={`/:openingType`} component={AllOpenings} exact />
          <Route path={`/loggedin/home`} component={LoggedIn} exact />
          <Route path={`/loggedin/myprofile`} component={MyProfile} exact />
          <Route
            path={`/loggedin/training/:type`}
            component={TrainingLessons}
            exact
          />
          <Route path={`/loggedin/training`} component={Training} exact />
          <Route
            path={`/loggedin/training-videos/:id`}
            component={TrainingVidoes}
            exact
          />
          <Route path={`/loggedin/gallery`} component={Gallery} exact />
          <Route path={`/loggedin/openings`} component={Openings} exact />
          <Route path={`/loggedin/documents`} component={Document} exact />
          <Route path={`/loggedin/exit-form`} component={ExitForm} exact />
          <Route
            path={`/loggedin/applications`}
            component={Applications}
            exact
          />
          <Route path={`/loggedin/assignments`} component={Assignments} exact />
          <Route
            path={`/loggedin/assignments/:id`}
            component={AssignmentDetails}
            exact
          />

          {/* <Route path={`/settings`} component={Settings} /> */}
        </Switch>
      </div>
    </div>
  );
}
