import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Modal,
  Snackbar,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Alert } from "@material-ui/lab";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { db, storage } from "../../firebase/Firebase";
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

const AssignmentDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [assignmentStatus, setAssignmentStatus] = useState(false);
  const [appliedDate, setAppliedDate] = useState("");
  const [errorRegister, setErrorRegister] = useState(false);
  const { user } = useContext(AuthContext);
  //File uploading states
  const [docFile, setDocFile] = useState("");
  const [comments, setComments] = useState("");

  //
  //modal states and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  //SnackBarClose
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAssignmentSuccess(false);
    setErrorRegister(false);
  };

  const handleImageUpload = (e) => {
    setDocFile(e.target.files[0]);
  };

  const onChange = (e) => {
    setComments(e.target.value);
  };

  useEffect(() => {
    //Getting assignment details using the id from the url
    db.collection(`Assignments`)
      .doc(`${id}`)
      .onSnapshot((doc) => {
        setCurrentAssignment(doc.data());
      });
  }, []);

  useEffect(() => {
    // Get the assignmentStatus
    db.collection(`InternsProfile/${user?.userDocId}/AppliedTo`)
      .where(`OpeningId`, "==", `${currentAssignment?.InternshipId}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().AssignmentStatus === "submitted")
            setAssignmentStatus(true);
        });
      });
  }, [currentAssignment]);

  //Getting applied date using .InternshipId from currentAssignment
  useEffect(() => {
    db.collection(`Internships/${currentAssignment?.InternshipId}/Applicants`)
      .where("InternID", "==", `${user?.userDocId}`)
      .onSnapshot((res) => {
        const apply = res.docs.map((doc) => doc.data().AppliedOn);
        setAppliedDate(apply[0]);
      });
  }, [currentAssignment, id]);

  //Uploading Assignments
  const submissionFunc = () => {
    //File Uploading function
    const storageLink = storage
      .child(
        `Interns_Data/${user.userDocId}/${currentAssignment?.Role}/ ${currentAssignment?.InternshipId}`
      )
      .put(docFile);

    //Check for states of the file uploading,
    storageLink.on(
      "state_changed",
      (snapShot) => {
        //If state changes, print the snapshot
        console.log(snapShot);
      },
      (err) => {
        //If error occurs, print the error
        console.log(err);
      },
      () => {
        //If upload gets completed, move on to next step
        //Inside Assignments/id/Submission, add a new submission with current's
        //users info
        storage
          .child(
            `Interns_Data/${user.userDocId}/${currentAssignment?.Role}/ ${currentAssignment?.InternshipId}`
          )
          .getDownloadURL()
          .then(async (fireBaseUrl) => {
            let assignmentSubs = await db
              .collection(`Assignments/${id}/Submissions`)
              .doc()
              .set({
                ApplicantId: user.userDocId,
                AppliedOn: appliedDate,
                AssignmentStatus: "submitted",
                Comments: comments,
                OpeningId: currentAssignment?.InternshipId,
                StorageUrl: fireBaseUrl,
              });
            console.log(assignmentSubs);

            //Added Submitted Assignments in Intern's Submitted Assignments collection
            await db
              .collection(
                `InternsProfile/${user.userDocId}/SubmittedAssignments`
              )
              .doc()
              .set({
                OpeningId: currentAssignment?.InternshipId,
                AssignmentId: id,
                Comments: comments,
                AssignmentStatus: "submitted",
                Deadline: "DeadlineDate",
                SubmittedOn: new Date(),
                SubmissionId: "",
                AppliedOn: appliedDate,
                StorageUrl: fireBaseUrl,
              })
              .then(() => {
                setAssignmentSuccess(true);
                handleModalClose();
              });

            // Update the assignmentStatus in AppliedTo collection
            await db
              .collection(`InternsProfile/${user?.userDocId}/AppliedTo`)
              .where(`OpeningId`, "==", `${currentAssignment?.InternshipId}`)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  db.collection(`InternsProfile/${user?.userDocId}/AppliedTo/`)
                    .doc(`${doc.id}`)
                    .update({
                      AssignmentStatus: "submitted",
                    });
                });
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
  return (
    <Fragment>
      {/* BreadCrumbs Navigation */}
      <Breadcrumbs
        separator={<NavigateNextIcon color="primary" />}
        style={{ marginBottom: "20px" }}
      >
        <Link
          to="/loggedin/assignments"
          style={{ color: "#707070", textDecoration: "none" }}
        >
          Assignments
        </Link>
        <Link style={{ color: "#000", textDecoration: "none" }}>
          {currentAssignment?.Role}
        </Link>
      </Breadcrumbs>
      {/* Title Heading */}
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {currentAssignment?.AssignmentName}
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            {/* <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <CardHeader
                        titleTypographyProps={{ variant: "h4" }}
                        title={val.AssignmentName}
                      />
                    </Box> */}
            <Divider />

            <CardContent>
              <Box
                className={classes.boxStyles}
                style={{ marginBottom: "5px" }}
              >
                <Typography variant="body1">
                  <b>Role : </b> {currentAssignment?.Role}
                </Typography>
                <Typography variant="body1">
                  <b>Submit by:</b>{" "}
                  {new Date(currentAssignment?.Deadline?.seconds * 1000)
                    .toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, "-")}
                </Typography>
              </Box>
              <Typography variant="body1" style={{ marginBottom: "20px" }}>
                <b>Assignment Catergory:</b> {currentAssignment?.Category}
              </Typography>
              <Typography variant="body1">
                <b>Assignment Description: </b>
                {currentAssignment?.AssignmentDetails}
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "right", marginRight: "5px" }}
            >
              <Fragment>
                {assignmentStatus ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={true}
                    onClick={handleOpen}
                  >
                    Submitted
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
            </CardActions>
          </Card>
          {/* Modal opens when submit assignment button is pressed */}
          <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Assignment Submission
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ margin: "20px 0 20px 0" }}
              >
                Upload your Assignment Documents below. The document must be a
                zip file or a mp4 file of the screenrecording of the working of
                your Assignment
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
                onClick={() => submissionFunc()}
              >
                Submit Assignment
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>

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
};

export default AssignmentDetails;
