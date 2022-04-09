import React from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Box,
  Paper,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";

import { Publish } from "@material-ui/icons";
import moment from "moment";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { useState } from "react";
import { SnackbarContext } from "../../Context/SnackbarContext";
import { useContext } from "react";
import { db, storage } from "../../firebase/Firebase";
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  topCard: {
    padding: theme.spacing(4),
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
}));

const exitProcess = [
  "Change resolute email id's Password",
  "KT folder link",
  "All Projects folder link",
  "Latest Image",
  "Written Testimonial",
  "Video Testimonial",
  "Feedback on internship",
];
const ExitForm = () => {
  const { callSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);
  const [testimonialVideoFile, setTestimonialVideoFile] = useState("");
  const [testimonialPhotoFile, setTestimonialPhotoFile] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    fatherName: "",
    resoluteEmailId: "",
    changedPassword: "",
    startDate: moment().format("YYYY-MM-DD "),
    endDate: moment().format("YYYY-MM-DD "),
    ktVideo: "",
    dataPrivacy: "", //Boolean
    deletedClientData: "", // Boolean
    internshipExperience: "",
    testimonial: "",
    changesInCertificate: "",
    feedback: "",
  });
  const classes = useStyles();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTestimonialVideoFileUpload = (e) => {
    setTestimonialVideoFile(e.target.files[0]);
  };

  const handleTestimonialPhotoFileUpload = (e) => {
    setTestimonialPhotoFile(e.target.files[0]);
  };

  const resetExitForm = () => {
    setFormData({
      email: "",
      name: "",
      fatherName: "",
      resoluteEmailId: "",
      changedPassword: "",
      startDate: moment().format("YYYY-MM-DD "),
      endDate: moment().format("YYYY-MM-DD "),
      ktVideo: "",
      dataPrivacy: "", //Boolean
      deletedClientData: "", // Boolean
      internshipExperience: "",
      testimonial: "",
      changesInCertificate: "",
      feedback: "",
    });
    setTestimonialPhotoFile("");
    setTestimonialVideoFile("");
  };
  const handleExitFormSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      name,
      fatherName,
      resoluteEmailId,
      changedPassword,
      startDate,
      endDate,
      ktVideo,
      dataPrivacy,
      deletedClientData,
      internshipExperience,
      testimonial,
      changesInCertificate,
      feedback,
    } = formData;
    // Check for errors
    if (
      !internshipExperience ||
      !testimonial ||
      !dataPrivacy ||
      !deletedClientData ||
      !email ||
      !fatherName ||
      !name ||
      !resoluteEmailId ||
      !testimonialPhotoFile ||
      !testimonialVideoFile
    ) {
      callSnackbar(true, "Fill all the required details", "error");
      return;
    }

    // Submit the Exit Form [ data object ]
    try {
      if (!user) return;
      callSnackbar(true, "Uploading form data and files", "success");
      const docRef = db.collection("SelectedCandidates").doc(user.userDocId);
      console.log(docRef);
      // update the data.
      docRef.update({
        ExitForm: {
          ...formData,
        },
      });

      // upload the files to SelectedInterns/id/ExitForm/
      const testimonialVideoRef = storage.child(
        `SelectedInterns/${user.userDocId}/ExitForm/testimonialVideo/${testimonialVideoFile.name}`
      );
      const testimonialPhotoRef = storage.child(
        `SelectedInterns/${user.userDocId}/ExitForm/testimonialPhoto/${testimonialPhotoFile.name}`
      );

      testimonialPhotoRef
        .put(testimonialPhotoFile)
        .then((snapshot) => testimonialVideoRef.put(testimonialVideoFile))
        .then(async () => {
          const testimonialVideoUrl =
            await testimonialVideoRef.getDownloadURL();
          const testimonialPhotoUrl =
            await testimonialPhotoRef.getDownloadURL();
          docRef.update({
            "ExitForm.testimonialVideoUrl": testimonialVideoUrl,
            "ExitForm.testimonialPhotoUrl": testimonialPhotoUrl,
          });
          callSnackbar(true, "Successfully submitted exit form", "success");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      callSnackbar(true, "Some error occured, please try again", "error");
      console.log(err);
    }
    // Reset the forms
    resetExitForm();
  };
  return (
    <>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Exit Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Paper
            style={{
              padding: "20px 40px 20px 40px",
              borderRadius: "3",
            }}
            elevation={3}
          >
            <Typography variant="h2">
              Congratulations on successfully completing internship at
              ResoluteAi.in
            </Typography>
            <Box style={{ marginTop: "10px" }}>
              {exitProcess.map((val, index) => (
                <Typography variant="body1">
                  {index + 1}. {val}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={12} xs={12}>
          <ValidatorForm>
            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Basic Details
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Email Address *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="email"
                    value={formData.email}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    label="Name *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={(e) => onChange(e)}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    label="Father's Name *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => onChange(e)}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="49%">
                  <TextValidator
                    label="Resolute Email ID *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="resoluteEmailId"
                    value={formData.resoluteEmailId}
                    onChange={(e) => onChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </Box>
                <Box width="49%">
                  <TextValidator
                    label="Changed Password *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="changedPassword"
                    value={formData.changedPassword}
                    onChange={(e) => onChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="49%">
                  <TextField
                    id="date-1"
                    label="Start-Date * "
                    type="date"
                    fullWidth
                    defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                    variant="outlined"
                    sx={{ width: 180 }}
                    inputProps={{}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.dateStyle}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        startDate: moment(e.target.value).format(
                          "YYYY-MM-DD hh:mm:ss a"
                        ),
                      }));
                    }}
                  />
                </Box>
                <Box width="49%">
                  <TextField
                    id="date-1"
                    label="End-Date *"
                    type="date"
                    fullWidth
                    defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                    variant="outlined"
                    sx={{ width: 180 }}
                    inputProps={{}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.dateStyle}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        endDate: moment(e.target.value).format(
                          "YYYY-MM-DD hh:mm:ss a"
                        ),
                      }));
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </ValidatorForm>
        </Grid>
        <Grid item lg={12} xs={12}>
          <ValidatorForm>
            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Knowledge Transfer (KT) and Data Privacy
              </Typography>
              <Box width="100%">
                <Typography variant="body1" className={classes.mb3}>
                  KT Folder Link Please do KT videos of the Poc's / Projects
                  done and upload it into a one drive folder
                </Typography>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="Your Answer"
                  name="ktVideo"
                  value={formData.ktVideo}
                  size="medium"
                  multiline
                  rows={4}
                  className={classes.mb3}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Box>
              <Box width="100%">
                <Typography variant="body1" className={classes.mb3}>
                  Data Privacy: Do you agree to keep confidentiality of projects
                  done, Pocs built , clients name. Clients data in any form
                  should not be shared to anyone in private or public?
                </Typography>
                <FormControl component="fieldset" className={classes.mb3}>
                  <RadioGroup
                    name="dataPrivacy"
                    value={formData.dataPrivacy}
                    onChange={(e) => onChange(e)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box width="100%">
                <Typography variant="body1">
                  Have you deleted all data from clients ?
                </Typography>

                <FormControl component="fieldset" className={classes.mb3}>
                  <FormLabel style={{ fontSize: "12px" }}>
                    {" "}
                    Data confidentiality must be kept and are subjected to
                    company's legal terms.
                  </FormLabel>
                  <RadioGroup
                    name="deletedClientData"
                    value={formData.deletedClientData}
                    onChange={(e) => onChange(e)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Paper>
          </ValidatorForm>
        </Grid>
        <Grid item lg={12} md={12}>
          <ValidatorForm>
            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              {" "}
              <Typography variant="h2" className={classes.mb3}>
                Let Us know about your Internship experience!
              </Typography>
              <Box width="100%">
                <Typography variant="body1" className={classes.mb3}>
                  How do you rate your overall internship experience? *
                </Typography>
                <FormControl component="fieldset" className={classes.mb3}>
                  <RadioGroup
                    name="internshipExperience"
                    value={formData.internshipExperience}
                    onChange={(e) => onChange(e)}
                  >
                    <FormControlLabel
                      value="Excellent"
                      control={<Radio color="primary" />}
                      label="Excellent"
                    />
                    <FormControlLabel
                      value="Very good"
                      control={<Radio color="primary" />}
                      label="Very good"
                    />
                    <FormControlLabel
                      value="Good"
                      control={<Radio color="primary" />}
                      label="Good"
                    />
                    <FormControlLabel
                      value="Fair"
                      control={<Radio color="primary" />}
                      label="Fair"
                    />
                    <FormControlLabel
                      value="Poor"
                      control={<Radio color="primary" />}
                      label="Poor"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box width="100%">
                <Typography variant="body1" className={classes.mb3}>
                  Please write your testimonial here *
                </Typography>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="Your Answer"
                  name="testimonial"
                  value={formData.testimonial}
                  size="medium"
                  multiline
                  rows={4}
                  className={classes.mb3}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.mb3}
              >
                <Box width="48%">
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="mT20"
                    component="label"
                    startIcon={<Publish />}
                  >
                    Please Upload one minute testimonial video.
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleTestimonialVideoFileUpload(e)}
                    />
                  </Button>
                  <Typography>{testimonialVideoFile.name}</Typography>
                </Box>
                <Box width="48%">
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="mT20"
                    component="label"
                    startIcon={<Publish />}
                  >
                    Official photo to share with your testimonial
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleTestimonialPhotoFileUpload(e)}
                    />
                  </Button>
                  <Typography>{testimonialPhotoFile.name}</Typography>
                </Box>
              </Box>
              <Box width="100%">
                <Typography variant="body1" className={classes.mb3}>
                  You will be issued an Internship Completion
                  Certificate(e-copy) and Experience letter do let us know if
                  there are any changes in the name and details mentioned in the
                  offer letter.
                </Typography>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="Your Answer"
                  name="changesInCertificate"
                  value={formData.changesInCertificate}
                  size="medium"
                  rows={4}
                  className={classes.mb3}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Box>
            </Paper>
          </ValidatorForm>
        </Grid>
        <Grid item lg={12} md={12}>
          <ValidatorForm>
            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              {" "}
              <Typography variant="h2" className={classes.mb3}>
                Thank you! and All the best!
              </Typography>
              <Box width="100%">
                <Typography variant="body1">How can we improve?</Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  className={classes.mb3}
                >
                  your feedback helps us a lot
                </Typography>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="Your Answer"
                  name="feedback"
                  value={formData.feedback}
                  size="medium"
                  multiline
                  rows={4}
                  className={classes.mb3}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </Box>
            </Paper>
          </ValidatorForm>
        </Grid>
        <Grid item lg={12} md={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className="mT20"
            onClick={(e) => {
              handleExitFormSubmit(e);
            }}
          >
            Save Exit Form
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ExitForm;
