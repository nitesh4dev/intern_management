import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  CardHeader,
  Divider,
  CardContent,
  CardActions,
  Button,
  Modal,
  Snackbar,
  TextareaAutosize,
  makeStyles,
} from "@material-ui/core";
import { db } from "../../firebase/Firebase";
import { AuthContext } from "../../Context/AuthContext";

import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../Context/SnackbarContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    padding: theme.spacing(4, 3),
    marginBottom: "40px",
    width: "48%",
  },
  cards: {
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    padding: theme.spacing(4, 3),
    marginBottom: "40px",
    width: "48%",
    height: "400px",
  },
  cardss: {
    padding: theme.spacing(4, 3),
    marginBottom: "40px",
    width: "100%",
    height: "420px",
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datetimeBox: {
    marginRight: "20px",
  },
  boxStyles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Assigments() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { callSnackbar } = useContext(SnackbarContext);

  // For redirecting
  const history = useHistory();

  //snackbar states
  const [success, setSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setErrorRegister(false);
  };

  //card data states and functions
  const [data, setData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentIds, setAssignmentIds] = useState(null);
  const [applyStatus, setApplyStatus] = useState([]);

useEffect(() => {
    let statusArr = [];

    // Here Find all the internships where this applicant has applied
    // Internships/J4n7OTVdVZpk851GL7aG /Applicants/user.DocId
    db.collection("Internships").onSnapshot((snapshot) => {
      const docId = snapshot.docs.map((doc) => doc.id);
      docId &&
        docId.forEach((val) => {
          db.collection(`Internships/${val}/Applicants`)
            .where("InternID", "==", `${user?.userDocId}`)
            .onSnapshot((res) => {
              let status = res.docs.map((doc) => doc.data().Status);
              statusArr.push(status[0]);
              setApplyStatus(statusArr.reverse());
            });
        });
    });
  }, []);

  // Structure an Assignment data where all of it will have a applyStatus
  useEffect(() => {
    // Find all assignment
    db.collection(`Assignments`).onSnapshot((snapshot) => {
      const assignment = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { ...data, docId: id };
      });
      setData(assignment);
    });

    let dataArr = [];
    data &&
      data.forEach((val, index) => {
        let dataObj = {
          ...val,
          applyStatus: applyStatus[index],
        };
        dataArr.push(dataObj);
      });
    setAssignmentData(dataArr);
  }, [applyStatus]);

  const viewDetailsFunc = (assignmentDocId) => {
    history.push(`/loggedin/assignments/${assignmentDocId}`);
  };

  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {" "}
        My Assignments{" "}
      </Typography>

      <Grid container spacing={3}>
        {assignmentData &&
          assignmentData.map((val, index) => {
            return (
              <Grid item lg={6} md={6} xs={12} key={index}>
                {val.applyStatus === "applied" ? (
                  <Card elevation={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <CardHeader
                        titleTypographyProps={{ variant: "h4" }}
                        title={val.AssignmentName}
                      />
                    </Box>
                    <Divider />

                    <CardContent>
                      <Box
                        className={classes.boxStyles}
                        style={{ marginBottom: "5px" }}
                      >
                        <Typography variant="body1">
                          <b>Role : </b> {val.Role}
                        </Typography>
                        <Typography variant="body1">
                          <b>Submit by:</b>{" "}
                          {new Date(val.Deadline.seconds * 1000)
                            .toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")}
                        </Typography>
                      </Box>
                      {/* <Typography
                        variant="body1"
                        style={{ marginBottom: "20px" }}
                      >
                        <b>Assignment Catergory:</b> {val.Category}
                      </Typography> */}
                      {/* <Typography variant="body1">
                        <b>Assignment Description: </b>
                        {val.AssignmentDetails}
                      </Typography> */}
                    </CardContent>
                    <CardActions
                      style={{ justifyContent: "right", marginRight: "5px" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          viewDetailsFunc(val.docId);
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                ) : (
                  <Fragment></Fragment>
                )}
              </Grid>
            );
          })}
      </Grid>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Submitted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorRegister}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          An error occured while Submitting. Try again!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
