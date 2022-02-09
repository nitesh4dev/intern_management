import React, { Fragment, useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase/Firebase";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
  Button,
  Snackbar,
  Modal,
  TextareaAutosize,
  makeStyles,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { Alert } from "@material-ui/lab";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext";
import { useHistory } from "react-router-dom";
import { timeStampToDateString } from "../../UtilityFunctions/utilityFunctions";

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
export default function Openings() {
  const classes = useStyles();
  const history = useHistory();
  const [applyButton, setApplyButton] = useState("Apply");
  const [success, setSuccess] = useState(false);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [openings, setOpenings] = useState(null);
  const [data, setData] = useState(null);
  const [openingsId, setOpeningsId] = useState(null);
  const [assignmentId, setAssignmentId] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  // Context Datas
  const { user } = useContext(AuthContext);
  const { setTitle } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    let statusArr = [];
    db.collection("Internships").onSnapshot((snapshot) => {
      const docData = snapshot.docs.map((doc) => doc.data());
      const docId = snapshot.docs.map((doc) => doc.id);
      const assignmentIds = snapshot.docs.map(
        (doc) => doc.data().AssignmentDetails.AssignmentId
      );
      setAssignmentId(assignmentIds);
      setData(docData);
      setOpeningsId(docId);
      docId &&
        docId.forEach((val) => {
          db.collection(`Internships/${val}/Applicants`)
            .where("InternID", "==", `${user?.userDocId}`)
            .onSnapshot((res) => {
              let status = res.docs.map((doc) => doc.data().Status);
              const apply = res.docs.map((doc) => doc.data().AppliedOn);
              statusArr.push(status[0]);
              console.log(apply[0]);
              setAppliedDate(apply[0]);
              setApplyButton(statusArr);
              console.log(appliedDate);
            });
        });
    });
  }, [success]);
  // console.log(applyButton);

  useEffect(() => {
    let submissionArr = [];
    assignmentId &&
      assignmentId.forEach((val, index) => {
        db.collection(`InternsProfile/${user?.userDocId}/SubmittedAssignments`)
          .where("AssignmentId", "==", `${val}`)
          .onSnapshot((snapShot) => {
            const assignStatus = snapShot.docs.map(
              (doc) => doc.data().AssignmentStatus
            );
            submissionArr.push(assignStatus[0]);
            setSubmissionStatus(submissionArr);
          });
      });
  }, [assignmentId, assignmentSuccess]);

  useEffect(() => {
    let dataArr = [];
    data &&
      data.map((val, index) => {
        let dataObj = {
          ...val,
          applyButton: applyButton[index],
          submissionStatus: submissionStatus[index],
        };
        dataArr.push(dataObj);
      });
    setOpenings(dataArr);
  }, [applyButton]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setAssignmentSuccess(false);
    setErrorRegister(false);
  };

  const applyFunc = async (index) => {
    const OpeningDetails = {
      AppliedOn: new Date(),
      Domain: openings[index].Domain,
      Title: openings[index].Title,
      Deadline: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    };
    const appliedToRef = await db
      .collection(`InternsProfile/${user?.userDocId}/AppliedTo`)
      .doc();
    appliedToRef
      .set({
        OpeningDetails,
        OpeningId: openingsId[index],
        OpeningStatus: "applied",
        AssignmentStatus: "received",
      })
      .then(() => {
        db.collection(`Internships/${openingsId[index]}/Applicants`)
          .doc()
          .set({
            AppliedOn: new Date(),
            InternID: user.userDocId,
            InternName: user.userData.GeneralDetails.internName,
            Status: "applied",
          })
          .then(() => {
            setSuccess(true);
          })
          .catch((err) => {
            setErrorRegister(true);
            console.log(err.message);
          });
      })
      .catch((err) => {
        setErrorRegister(true);
        console.log(err.message);
      });
  };

  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Openings
      </Typography>
      <Grid container spacing={3}>
        {openings &&
          openings.map((opening, index) => {
            return (
              <Grid item lg={12} md={12} xs={12} key={index}>
                <Card elevation={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <CardHeader
                      titleTypographyProps={{ variant: "h4" }}
                      title={opening.Title}
                    />
                  </Box>
                  <Divider />

                  <CardContent>
                    <Box
                      className={classes.boxStyles}
                      style={{ marginBottom: "20px" }}
                    >
                      <Typography variant="body1">
                        <b>Number of Openings: </b> {opening.NumberOfOpenings}
                      </Typography>
                      <Typography variant="body1">
                        <b>Internship Duration:</b> {opening.Duration}
                      </Typography>
                      <Typography variant="body1">
                        <b>Apply by:</b>{" "}
                        {timeStampToDateString(opening.ApplyBy)}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      <b>Internship Title:</b> {opening.Title}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "20px" }}
                    >
                      <b>Internship Domain:</b> {opening.Domain}
                    </Typography>
                    <Typography variant="body1">
                      <b>Internship Description: </b>
                      {opening.Description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ justifyContent: "right", marginRight: "5px" }}
                  >
                    {opening.applyButton === "applied" ? (
                      <Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={true}
                          onClick={() => applyFunc(index)}
                        >
                          {opening.applyButton}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setTitle("Your Assignments");
                            history.push("assignments");
                          }}
                        >
                          View Assignment
                        </Button>
                      </Fragment>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => applyFunc(index)}
                      >
                        Apply
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Applied successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={assignmentSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
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
