import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Paper,
  Container,
  Avatar,
  Grid,
  Box,
  Typography,
  Button,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  withStyles,
  IconButton,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { OpenInNew } from "@material-ui/icons";
import { db } from "../../firebase/Firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useHistory } from "react-router-dom";
import dummyprofile from "../../assets/images/dummy-profile-img.jpeg";
import EditProfile from "./EditProfile";
import { AuthContext } from "../../Context/AuthContext";

const AttendenceProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#7388A95A",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#26D383",
  },
}))(LinearProgress);

const EffectiveProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#7388A95A",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FA2609",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  typoMargin: {
    marginBottom: "20px",
  },
}));

export default function MyProfile() {
  let history = useHistory();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [candidateData, setCandidateData] = useState({});
  const [profileStatus, setProfileStatus] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // Get the data from
  useEffect(() => {
    if (!user) return;
    setProfileStatus(user.userData.candidateDetails.profileComplete);
    setCandidateData(user.userData);
    // db.collection(`SelectedCandidates`)
    //   .doc(user.userDocId)
    //   .get()
    //   .then((res) => {
    //     setProfileStatus(res.data().candidateDetails.profileComplete);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [user]);

  useEffect(() => {
    if (profileStatus) setProgressValue(100);
    else setProgressValue(7.6);
  }, [profileStatus]);
  const showEditFunc = () => {
    console.log("triggered edit function");
    if (!user) return;
    setCandidateData(user.userData);
    // db.collection(`SelectedCandidates`)
    //   .doc(user.userDocId)
    //   .get()
    //   .then((res) => {
    //     setCandidateData(res.data());
    //     console.log(res.data());
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3} xs={12}>
              <Box>
                <Avatar
                  src={candidateData.candidateDetails?.attachments?.photoUrl}
                  style={{
                    margin: "10px",
                    width: 100,
                    height: 100,
                  }}
                  aria-label="profile image"
                ></Avatar>
              </Box>
            </Grid>
            <Grid item lg={9} md={9} xs={12}>
              <Box className={classes.typoMargin}>
                <Typography variant="h2" className={classes.typoMargin}>
                  {candidateData.candidateDetails?.basicDetails.fullName}
                  <Tooltip title={`Edit Profile`}>
                    <IconButton
                      onClick={() => {
                        showEditFunc();
                        setShowEdit(!showEdit);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="h5">
                  {
                    candidateData.candidateDetails?.internshipDetails
                      ?.designation
                  }
                </Typography>
                {/* <Typography variant="body1">
                  Resume
                  <Tooltip title={`View Resume`}>
                    <OpenInNew
                      color="primary"
                      fontSize="small"
                      style={{ paddingTop: "5px" }}
                    />
                  </Tooltip>
                </Typography> */}
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Box>
                      <Typography variant="body1">
                        <b>Resolute Email :</b>{" "}
                        {
                          candidateData?.candidateDetails?.basicDetails
                            ?.resoluteEmail
                        }
                      </Typography>
                      {/* <Typography variant="body1">
                        <b>Total Experience :</b>{" "}
                        {
                          candidateData?.candidateDetails?.internshipDetails
                            ?.internshipPeriod
                        }{" "}
                        months
                      </Typography> */}
                      {/* <Typography variant="body1">
                        <b>Vendor Name:</b> asasd
                      </Typography> */}
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Box>
                      <Typography variant="body1">
                        <b>Phone Number :</b>{" "}
                        {
                          candidateData?.candidateDetails?.basicDetails
                            ?.phoneNumber
                        }
                      </Typography>
                      <Typography variant="body1">
                        <b>Location :</b>{" "}
                        {
                          candidateData?.candidateDetails?.basicDetails
                            ?.location
                        }
                      </Typography>
                      {/* <Typography variant="body1">
                        <b>Notice Period:</b> 30 days
                      </Typography> */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <>
                  <Box width="50%">
                    <Typography variant="body1">
                      Profile Completion {progressValue}%
                    </Typography>
                    <EffectiveProgressBar
                      variant="determinate"
                      value={progressValue}
                    />
                  </Box>
                  {!profileStatus && (
                    <Box width="50%" textAlign="center">
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          showEditFunc();
                          setShowEdit(!showEdit);
                        }}
                      >
                        Complete Profile
                      </Button>
                    </Box>
                  )}
                </>
              </Box>
            </Grid>
            {/* <Grid item lg={4} md={4} xs={12}>
              <Box>
                <Typography variant="h2" className={classes.typoMargin}>
                  Skills
                </Typography>
                <li>Leadership</li>
                <li>Team Player</li>
                <li>Great Communicator</li>
                <li>Leadership</li>
              </Box>
            </Grid> */}
          </Grid>
        </CardContent>

        {/* <Divider />
        <CardContent>
          <Typography variant="h3" className={classes.typoMargin}>
            Experience Details
          </Typography>
        </CardContent> */}
      </Card>
      <Box style={{ marginTop: "20px" }}>
        {showEdit ? (
          <EditProfile
            candidateData={candidateData}
            profileStatus={profileStatus}
          />
        ) : null}
      </Box>
    </Fragment>
  );
}
