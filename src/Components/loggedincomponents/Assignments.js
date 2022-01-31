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
import PublishIcon from "@material-ui/icons/Publish";
import { Alert } from "@material-ui/lab";

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

  //modal states and functions
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  //card data states and functions
  const [data, setData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentIds, setAssignmentIds] = useState(null);
  const [applyStatus, setApplyStatus] = useState("Apply");
  const [docFile, setDocFile] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    let statusArr = [];
    db.collection(`Assignments`).onSnapshot((snapshot) => {
      const assignment = snapshot.docs.map((doc) => doc.data());
      setData(assignment);
    });
    db.collection("Internships").onSnapshot((snapshot) => {
      const docId = snapshot.docs.map((doc) => doc.id);
      docId &&
        docId.map((val) => {
          db.collection(`Internships/${val}/Applicants`)
            .where("InternID", "==", `${user.userDocId}`)
            .onSnapshot((res) => {
              let status = res.docs.map((doc) => doc.data().Status);
              statusArr.push(status[0]);
              setApplyStatus(statusArr.reverse());
            });
        });
    });
  }, []);
  useEffect(() => {
    let dataArr = [];
    data &&
      data.map((val, index) => {
        let dataObj = {
          ...val,
          applyStatus: applyStatus[index],
        };
        dataArr.push(dataObj);
      });
    setAssignmentData(dataArr);
  }, [applyStatus]);

  console.log(assignmentData);

  const viewDetailsFunc = () => {};

  const handleImageUpload = (e) => {
    setDocFile(e.target.files[0]);
  };

  const onChange = (e) => {
    setComments(e.target.value);
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
              <Grid item lg={12} md={12} xs={12} key={index}>
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
                        style={{ marginBottom: "20px" }}
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
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "20px" }}
                      >
                        <b>Assignment Catergory:</b> {val.Category}
                      </Typography>
                      <Typography variant="body1">
                        <b>Assignment Description: </b>
                        {val.AssignmentDetails}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{ justifyContent: "right", marginRight: "5px" }}
                    >
                      <Fragment>
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
                ) : (
                  <Fragment></Fragment>
                )}

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
