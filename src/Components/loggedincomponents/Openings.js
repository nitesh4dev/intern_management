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
  const [applyButton, setApplyButton] = useState("Apply");
  const [success, setSuccess] = useState(false);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [openings, setOpenings] = useState(null);
  const [data, setData] = useState(null);
  const [openingsId, setOpeningsId] = useState(null);
  const [docFile, setDocFile] = useState("");
  const [comments, setComments] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { user } = useContext(AuthContext);
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
        docId.map((val) => {
          db.collection(`Internships/${val}/Applicants`)
            .where("InternID", "==", `${user.userDocId}`)
            .onSnapshot((res) => {
              let status = res.docs.map((doc) => doc.data().Status);
              const apply = res.docs.map((doc) => doc.data().AppliedOn);
              statusArr.push(status[0]);
              setAppliedDate(apply[0]);
              setApplyButton(statusArr);
            });
        });
    });
  }, [success]);
  // console.log(applyButton);

  useEffect(() => {
    let submissionArr = [];
    assignmentId &&
      assignmentId.map((val, index) => {
        db.collection(`InternsProfile/${user.userDocId}/SubmittedAssignments`)
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

  console.log(openings);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setAssignmentSuccess(false);
    setErrorRegister(false);
  };

  const handleImageUpload = (e) => {
    setDocFile(e.target.files[0]);
  };

  const onChange = (e) => {
    setComments(e.target.value);
  };

  const applyFunc = async (index) => {
    const OpeningDetails = {
      AppliedOn: new Date(),
      Domain: openings[index].Domain,
      Title: openings[index].Title,
    };
    const appliedToRef = await db
      .collection(`InternsProfile/${user.userDocId}/AppliedTo`)
      .doc();
    appliedToRef
      .set({
        OpeningDetails,
        OpeningId: openingsId[index],
        OpeningStatus: "applied",
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

  const submissionFunc = (index) => {
    // const submissionObj = {
    //   ApplicantId: user.userDocId,
    //   AppliedOn: appliedDate,
    //   AssignmentStatus: "",
    //   Comments: comments,
    //   OpeningId: openingsId[index],
    //   StorageUrl: " ",
    // };
    // console.log(submissionObj);
    // const internsAssignment = {
    //   AssignmentId: assignmentId[index],
    //   Comments: comments,
    //   Deadline: new Date(),
    //   Submissions: "storagelink",
    // };
    let SubmissionDetails = {
      Comments: comments,
      StorageUrl: "",
      SubmittedOn: new Date(),
    };
    const storageLink = storage
      .child(
        `Interns_Data/${user.userDocId}/${openings[index].Title}/ ${openingsId[index]}`
      )
      .put(docFile);
    storageLink.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .child(
            `Interns_Data/${user.userDocId}/${openings[index].Title}/ ${openingsId[index]}`
          )
          .getDownloadURL()
          .then(async (fireBaseUrl) => {
            console.log(assignmentId[index]);
            let assignmentSubs = await db
              .collection(`Assignments/${assignmentId[index]}/Submissions`)
              .doc()
              .set({
                ApplicantId: user.userDocId,
                AppliedOn: appliedDate,
                AssignmentStatus: "Submitted",
                Comments: comments,
                OpeningId: openingsId[index],
                StorageUrl: fireBaseUrl,
              });
            console.log(assignmentSubs);
            await db
              .collection(
                `InternsProfile/${user.userDocId}/SubmittedAssignments`
              )
              .doc()
              .set({
                OpeningId: openingsId[index],
                AssignmentId: assignmentId[index],
                Comments: comments,
                AssignmentStatus: "Submitted",
                Deadline: "DeadlineDate",
                SubmittedOn: new Date(),
                SubmissionId: "",
                AppliedOn: appliedDate,
                StorageUrl: fireBaseUrl,
              })
              .then(() => {
                alert("Successfully Submitted");
                setAssignmentSuccess(true);
                handleModalClose();
              });
            // await db
            //   .collection(`InternsProfile/${user.userDocId}/AppliedTo`)
            //   .where("OpeningId", "==", `${openingsId[index]}`)
            //   .update({
            //     ...SubmissionDetails,
            //     StorageUrl: fireBaseUrl,
            //   });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  const viewDetailsFunc = () => {};
  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Openings
      </Typography>
      <Grid container spacing={3}>
        {openings &&
          openings.map((val, index) => {
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
                      title={val.Title}
                    />
                  </Box>
                  <Divider />

                  <CardContent>
                    <Box
                      className={classes.boxStyles}
                      style={{ marginBottom: "20px" }}
                    >
                      <Typography variant="body1">
                        <b>Number of Openings: </b> {val.NumberOfOpenings}
                      </Typography>
                      <Typography variant="body1">
                        <b>Internship Duration:</b> {val.Duration}
                      </Typography>
                      <Typography variant="body1">
                        <b>Apply by:</b>{" "}
                        {new Date(val.ApplyBy.seconds * 1000)
                          .toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/ /g, "-")}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      <b>Internship Title:</b> {val.Title}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "20px" }}
                    >
                      <b>Internship Domain:</b> {val.Domain}
                    </Typography>
                    <Typography variant="body1">
                      <b>Internship Description: </b>
                      {val.Description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ justifyContent: "right", marginRight: "5px" }}
                  >
                    {val.applyButton === "applied" ? (
                      <Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={true}
                          onClick={() => applyFunc(index)}
                        >
                          {val.applyButton}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          View Assignment
                        </Button>
                        {val.submissionStatus === "Submitted" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={true}
                            onClick={handleOpen}
                          >
                            Assignment Submitted
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleOpen}
                          >
                            Submit Assignment
                          </Button>
                        )}
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={viewDetailsFunc}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
                <Modal
                  open={open}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h2"
                      component="h2"
                    >
                      Assignment Submission
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      style={{ margin: "20px 0 20px 0" }}
                    >
                      Upload your Assignment Documents below. The document must
                      be a zip file or a mp4 file of the screenrecording of the
                      working of your Assignment
                    </Typography>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={5}
                      placeholder="Comments"
                      style={{ width: "100%", marginBottom: "20px" }}
                      onChange={(e) => onChange(e)}
                    />
                    <Box
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        startIcon={<PublishIcon />}
                      >
                        Upload Documents
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </Button>
                      <Typography>{docFile.name}</Typography>
                    </Box>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      className="mT20"
                      onClick={() => submissionFunc(index)}
                    >
                      Submit Assignment
                    </Button>
                  </Box>
                </Modal>
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
