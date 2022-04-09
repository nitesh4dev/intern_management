import React, { Fragment, useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase/Firebase";
import firebase from "firebase/compat";
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
export default function Openings() {
  const classes = useStyles();
  const history = useHistory();
  const { callSnackbar } = useContext(SnackbarContext);
  const [openings, setOpenings] = useState([]);
  // const [applyButton, setApplyButton] = useState("Apply");
  // const [success, setSuccess] = useState(false);
  // const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  // const [errorRegister, setErrorRegister] = useState(false);
  // const [data, setData] = useState(null);
  // const [openingsId, setOpeningsId] = useState(null);
  // const [assignmentId, setAssignmentId] = useState("");
  // const [appliedDate, setAppliedDate] = useState("");
  // const [submissionStatus, setSubmissionStatus] = useState("");
  // const [newOpenings, setNewOpenings] = useState([]);

  // Context Datas
  const { user } = useContext(AuthContext);
  const { setTitle } = useContext(DataContext);

  useEffect(() => {
    if (!user) return;
    setOpenings([]);
    db.collection("Internships").onSnapshot((snapshot) => {
      snapshot.forEach((doc1) => {
        // Check if the opening's applyByDate is more than today's date
        let applyByDate = doc1.data().ApplyBy.toDate();
        let todaysDate = new Date();
        let diff = applyByDate - todaysDate;
        console.log(applyByDate, todaysDate);
        console.log(diff);
        if (doc1.data().Status === "not active") {
          return;
        } else if (diff >= 0) {
          db.collection(`Internships/${doc1.id}/Applicants`)
            .where("InternID", "==", `${user?.userDocId}`)
            .get()
            .then((snapshot) => {
              if (snapshot.docs.length === 0)
                setOpenings((prev) => [
                  ...prev,
                  {
                    openingDocId: doc1.id,
                    ...doc1.data(),
                    ApplicationStatus: "Not Applied",
                  },
                ]);
              else
                setOpenings((prev) => [
                  ...prev,
                  {
                    openingDocId: doc1.id,
                    ...doc1.data(),
                    ApplicationStatus: snapshot.docs[0].data().Status,
                    AppliedOn: snapshot.docs[0].data().appliedOn,
                  },
                ]);
            })
            .catch((err) => callSnackbar(true, "An error occurred", "error"));
        }
      });
    });
  }, []);

  // useEffect(() => {
  //   let statusArr = [];
  //   db.collection("Internships").onSnapshot((snapshot) => {
  //     const docData = snapshot.docs.map((doc) => doc.data());
  //     const docId = snapshot.docs.map((doc) => doc.id);
  //     const assignmentIds = snapshot.docs.map(
  //       (doc) => doc.data().AssignmentDetails.AssignmentId
  //     );
  //     setAssignmentId(assignmentIds);
  //     setData(docData);
  //     setOpeningsId(docId);
  //     docId &&
  //       docId.forEach((val) => {
  //         db.collection(`Internships/${val}/Applicants`)
  //           .where("InternID", "==", `${user?.userDocId}`)
  //           .onSnapshot((res) => {
  //             let status = res.docs.map((doc) => doc.data().Status);
  //             const apply = res.docs.map((doc) => doc.data().AppliedOn);
  //             statusArr.push(status[0]);
  //             console.log(apply[0]);
  //             setAppliedDate(apply[0]);
  //             setApplyButton(statusArr);
  //             console.log(appliedDate);
  //           });
  //       });
  //   });
  // }, [success]);
  // console.log(applyButton);

  // useEffect(() => {
  //   let submissionArr = [];
  //   assignmentId &&
  //     assignmentId.forEach((val, index) => {
  //       db.collection(`InternsProfile/${user?.userDocId}/SubmittedAssignments`)
  //         .where("AssignmentId", "==", `${val}`)
  //         .onSnapshot((snapShot) => {
  //           const assignStatus = snapShot.docs.map(
  //             (doc) => doc.data().AssignmentStatus
  //           );
  //           submissionArr.push(assignStatus[0]);
  //           setSubmissionStatus(submissionArr);
  //         });
  //     });
  // }, [assignmentId, assignmentSuccess]);

  // useEffect(() => {
  //   let dataArr = [];
  //   data &&
  //     data.map((val, index) => {
  //       let dataObj = {
  //         ...val,
  //         applyButton: applyButton[index],
  //         submissionStatus: submissionStatus[index],
  //       };
  //       dataArr.push(dataObj);
  //     });
  //   setOpenings(dataArr);
  // }, [applyButton]);

  const handleApply = async (openingDocId) => {
    if (!user) {
      callSnackbar(true, "Please let the user data load first", "success");
      return;
    }
    const currentOpening = openings.find(
      (opening) => opening.openingDocId === openingDocId
    );
    try {
      const appliedToRef = await db
        .collection(`InternsProfile/${user.userDocId}/AppliedTo`)
        .doc();

      const OpeningDetails = {
        AppliedOn: new Date(),
        Domain: currentOpening.Domain,
        Title: currentOpening.Title,
        Deadline: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
      };
      await appliedToRef.set({
        OpeningDetails,
        OpeningId: currentOpening.openingDocId,
        OpeningStatus: "applied",
        AssignmentStatus: "received",
      });
      await db
        .collection(`Internships/${currentOpening.openingDocId}/Applicants`)
        .doc()
        .set({
          AppliedOn: new Date(),
          InternID: user.userDocId,
          InternName: user.userData.GeneralDetails.internName,
          Status: "applied",
        });
      callSnackbar(true, "Successfully applied", "success");
    } catch (err) {
      callSnackbar(true, "Got an Error", "error");
      console.log(err.message);
    }
  };
  // const applyFunc = async (index) => {
  //   const OpeningDetails = {
  //     AppliedOn: new Date(),
  //     Domain: openings[index].Domain,
  //     Title: openings[index].Title,
  //     Deadline: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
  //   };
  //   const appliedToRef = await db
  //     .collection(`InternsProfile/${user?.userDocId}/AppliedTo`)
  //     .doc();
  //   appliedToRef
  //     .set({
  //       OpeningDetails,
  //       OpeningId: openingsId[index],
  //       OpeningStatus: "applied",
  //       AssignmentStatus: "received",
  //     })
  //     .then(() => {
  //       db.collection(`Internships/${openingsId[index]}/Applicants`)
  //         .doc()
  //         .set({
  //           AppliedOn: new Date(),
  //           InternID: user.userDocId,
  //           InternName: user.userData.GeneralDetails.internName,
  //           Status: "applied",
  //         })
  //         .then(() => {
  //           callSnackbar(true, "Successfully applied", "success");
  //         })
  //         .catch((err) => {
  //           callSnackbar(true, "Got an Error", "error");
  //           console.log(err.message);
  //         });
  //     })
  //     .catch((err) => {
  //       setErrorRegister(true);
  //       console.log(err.message);
  //     });
  // };
  console.log(openings);
  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Openings
      </Typography>
      <Grid container spacing={3}>
        {openings &&
          openings.map((opening, index) => (
            <Grid item lg={12} md={12} xs={12} key={index}>
              <Card elevation={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <CardHeader
                    titleTypographyProps={{ variant: "h4" }}
                    title={opening?.Title}
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
                      {opening.ApplyBy.toDate()
                        .toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "-")}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    <b>Internship Title:</b> {opening.Title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: "20px" }}>
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
                  {opening.ApplicationStatus === "applied" ? (
                    <Fragment>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={true}
                      >
                        {opening.ApplicationStatus}
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
                      onClick={
                        (e) => {
                          e.preventDefault();
                          handleApply(opening.openingDocId);
                        }
                        // applyFunc(index)
                      }
                    >
                      Apply
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}
