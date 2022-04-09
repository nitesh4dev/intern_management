import React, { useContext, useState } from "react";
import ResoluteAILogo from "../assets/images/resoluteai-logo.png";
import SuperUserBg from "../assets/images/SuperuserBg.jpg";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link, useHistory } from "react-router-dom";
import { Grid, Typography, makeStyles, Box, Button } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { SnackbarContext } from "../Context/SnackbarContext";
import { db } from "../firebase/Firebase";
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

export default function SelectedSignup() {
  const classes = useStyles();
  const history = useHistory();

  const { user, selectedCandidateSignup } = useContext(AuthContext);
  const { callSnackbar } = useContext(SnackbarContext);
  //Form state
  const [formData, setFormdata] = useState({
    resoluteEmail: "",
    personalEmail: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // On Input Change
  const onChange = (e) =>
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  const { personalEmail, resoluteEmail, password, name, confirmPassword } =
    formData;

  const resetForm = () => {
    setFormdata({
      resoluteEmail: "",
      personalEmail: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };
  //Sign Up Selected Interns
  const handleSignup = () => {
    // If both email and password fields are present
    if (
      !personalEmail ||
      !password ||
      !name ||
      !confirmPassword ||
      !resoluteEmail
    ) {
      console.log("Fill all the details");
      callSnackbar(true, "Please fill all the fields", "warning");
      return;
    }
    // Check if the email matches the format we need
    let splittedEmail = resoluteEmail.split(".");
    if (splittedEmail[1] !== "resoluteai@gmail" || splittedEmail[2] !== "com") {
      callSnackbar(
        true,
        `Email doesn't match with the Resoluteai.in format`,
        `warning`
      );
      return;
    }

    // Password length check
    if (password.length < 8) {
      callSnackbar(
        true,
        "The password should be at least 8 characters long",
        "warning"
      );
      return;
    }

    // Password matching with confirmPassword Check
    if (password !== confirmPassword) {
      callSnackbar(
        true,
        `Confirm password doesn't match original password`,
        "warning"
      );
      return;
    }

    // Sign UP
    selectedCandidateSignup(resoluteEmail, personalEmail, password, name);
    resetForm();
  };
  return (
    <Grid container component="main" className={classes.root}>
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
          <Box textAlign="center" className={classes.marginTop3}></Box>
          <Typography variant="h2" className={classes.heading}>
            Enter your Resoluteai.in details to Sign up
          </Typography>

          <ValidatorForm>
            <TextValidator
              label="Full Name"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              validators={["required"]}
            />
            <TextValidator
              label="Personal Email"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="personalEmail"
              value={personalEmail}
              onChange={(e) => onChange(e)}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Not a valid email ID"]}
            />
            <TextValidator
              label="Resolute Email"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="resoluteEmail"
              value={resoluteEmail}
              onChange={(e) => onChange(e)}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Not a valid email ID"]}
            />
            <TextValidator
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
            <TextValidator
              type="password"
              label="Confirm Password"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onChange(e)}
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              Sign Up
            </Button>
          </ValidatorForm>

          <Typography align="left" className={classes.marginTop3}>
            Already registered ?{" "}
            <Link to="/selected-login" style={{ color: "red" }}>
              Click here{" "}
            </Link>{" "}
            to login
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
