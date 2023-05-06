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
import  Attendance  from "./attendance/attendance";

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

  // Get user data passed from the context.
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.mainContainer}>
      {/* The header component will be rendered for all the path starting with '/', e.g
      '/interns/id */}
      <Header />
      <div className={classes.contentBody}>
        <div className={classes.toolBar}></div>

        {/* Right now the route is pointing at '/', but if user info is not null, meaning present, It will redirect to '/loggedin/home',  */}
        {user != null && <Redirect to="/loggedin/home" />}

        {/* If user info is null, we redirect them to signup for selected interns route */}
        {user == null && <Redirect to="/selected-signup" />}
        <Switch>
          {/* The following Routes contains different components that should be rendered for different paths */}
          <Route path={`/`} component={DashboardHome} exact />

          {/* Login component is for new candidates who would like to apply as a new intern */}
          <Route path={`/login`} component={Login} exact /> 

          {/* SelectedLogin component is for onboarding selected candidate shortlisted from somewhere else or from this portal itself. */}
          <Route path={`/selected-login`} component={SelectedLogin} exact />

          {/* SelectedSignup component displays form for signing up selected candidates and setting their account.  */}
          <Route path={"/selected-signup"} component={SelectedSignup} exact />

          {/* All Openings is a component that displays different openings at resoluteai which is viewable even for new interns or any other user who visits the page. */}
          <Route path={`/:openingType`} component={AllOpenings} exact />

          {/* LoggedIn: home section acts like dashboard, which hasn't been coded whole and its there as placeholder for now. */}
          <Route path={`/loggedin/home`} component={LoggedIn} exact />

          <Route path={`/loggedin/attendance`} component={Attendance} exact />

          {/* MyProfile component: is an extensive form for the selected candidate, viewable after logging in, that has to be filled by the candidate as part of onboarding process. */}
          <Route path={`/loggedin/myprofile`} component={MyProfile} exact />

          {/* TrainingLessons: Lessong table for each training module. */}
          <Route
            path={`/loggedin/training/:type`}
            component={TrainingLessons}
            exact
          />

          {/* Training component: renders different training modules as part of unboarding */}
          <Route path={`/loggedin/training`} component={Training} exact />

          {/* TrainingVideos component: shows video and quizzes related to the lesson selected from table in TrainingLessons component */}
          <Route
            path={`/loggedin/training-videos/:id`}
            component={TrainingVidoes}
            exact
          />

          {/* Gallery component: includes testimonials and pictures of previous interns */}
          <Route path={`/loggedin/gallery`} component={Gallery} exact />

          {/* Openings component: shows openings for logged in users */}
          <Route path={`/loggedin/openings`} component={Openings} exact />

          {/* Document component shows documents like NDA and agreement in a model form, for the candidates to agree to.*/}
          <Route path={`/loggedin/documents`} component={Document} exact />

          {/* ExitForm component: this form is not visible for selected candidates that just joined, it should be visible if the candidate is nearing his/her/their end of tenure */}
          <Route path={`/loggedin/exit-form`} component={ExitForm} exact />

          {/* Applications component: displays table to show the candidates where they have applied to and their corresponding status, since the app is changed to work as an onboarding platform, this component is obsolete for now. It can be reused when the app should support new interns also. */}
          <Route
            path={`/loggedin/applications`}
            component={Applications}
            exact
          />

          {/* Shows all the assignments assigned for each openings */}
          <Route path={`/loggedin/assignments`} component={Assignments} exact />

          {/* Assignment details and submission button and modals */}
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
