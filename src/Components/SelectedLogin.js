import React, { useContext, useState } from "react";
import ResoluteAILogo from "../assets/images/resoluteai-logo.png";
import SuperUserBg from "../assets/images/SuperuserBg.jpg";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Hidden,
  Typography,
  makeStyles,
  Box,
  Button,
  Snackbar,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { AuthContext } from "../Context/AuthContext";
import { SnackbarContext } from "../Context/SnackbarContext";

//Custom styling
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    justifyContent: "center",
  },
  image: {
    backgroundImage: `url(${SuperUserBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  formHolder: {
    maxWidth: "390px",
    textAlign: "center",
  },
  textFields: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    padding: theme.spacing(3, 0, 3, 0),
  },
  marginTop3: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectedLogin() {
  const classes = useStyles();
  const history = useHistory();

  const { user, login } = useContext(AuthContext);
  const { callSnackbar } = useContext(SnackbarContext);
  //Form state
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  const { email, password } = formData;

  //LOGIN CLIENT
  const handleLogin = () => {
    // If both email and password fields are present
    if (!email || !password) {
      console.log("Fill all the details");
      callSnackbar(true, "Please fill both the fields", "warning");
      return;
    }
    // login(email, password);
  };
  return (
    <Grid container component="main" className={classes.root}>
      {/* <Hidden smDown>
        <Grid container md={7} className={classes.image}></Grid>
      </Hidden> */}
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        container
        direction="column"
        justify="center"
      >
        <Box className={classes.formHolder} mx="auto">
          <img src={ResoluteAILogo} alt="FaceGenieLogo" width="50%" />
          {/* <Typography variant="subtitle1" className={classes.heading}>
            Facegenie Super Admin
          </Typography> */}
          <Box textAlign="center" className={classes.marginTop3}>
            {/* <Button
              startIcon={<ArrowBack />}
              // onClick={() => setGoBack(true)}
              color="primary"
            >
              Go back
            </Button> */}
          </Box>
          <Typography variant="h2" className={classes.heading}>
            Enter your Resoluteai.in details to login
          </Typography>

          <ValidatorForm>
            <TextValidator
              placeholder="Email Address"
              label="Email Address"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Not a valid email ID"]}
            />
            <TextValidator
              placeholder="Password"
              type="password"
              label="Password"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </ValidatorForm>

          <Typography align="left" className={classes.marginTop3}>
            Don't have an account already?{" "}
            <Link to="/selected-signup" style={{ color: "red" }}>
              Click here{" "}
            </Link>{" "}
            to signup
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
