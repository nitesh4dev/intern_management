import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Select,
  Dialog,
  Slide,
  Snackbar,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import LoadingScreen from "../../common/LoadingScreen";
import PublishIcon from "@material-ui/icons/Publish";
import moment from "moment";
import { SnackbarContext } from "../../Context/SnackbarContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  border: {
    borderBottom: "2px solid gray",
    width: "50%",
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 22,
    color: "gray",
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
  modalContainer: {
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "30px",
  },
}));

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "Skill 1",
  "Skill 2",
  "Skill 3",
  "Skill 4",
  "Skill 5",
  "Skill 6",
];

export default function EditProfile() {
  const classes = useStyles();
  const { callSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [photo, setPhoto] = useState("");
  const [panCard, setPanCard] = useState("");
  const [coreSkills, setCoreSkills] = useState([]);
  const [spocDetails, setSpocDetails] = useState([]);
  const [exist, setExist] = useState(false);
  const [fieldMissing, setFieldMissing] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false);
  const [handleSuccess, setHandleSuccess] = useState(false);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD "));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD "));

  //form values
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    email: "",
    phoneNumber: "",
    location: "",
    qualification: "",
    parentName: "",
    altContactPersonName: "",
    altContactPersonNo: "",
    domain: "",
    designation: "",
    internshipPeriod: "",
    workMode: "",
    bankName: "",
    accHolderName: "",
    accNumber: "",
    branchName: "",
    isfcCode: "",
    experienceDetails: "",
    linkedInUrl: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const {
    fullName,
    collegeName,
    location,
    qualification,
    email,
    phoneNumber,
    parentName,
    altContactPersonName,
    altContactPersonNo,
    domain,
    designation,
    internshipPeriod,
    workMode,
    bankName,
    accHolderName,
    accNumber,
    branchName,
    isfcCode,
    experienceDetails,
    linkedInUrl,
  } = formData;

  //checking if vendor exists
  useEffect(() => {}, [email]);

  //Modal state
  const [modelOpen, setModelOpen] = useState(false);

  const modalClose = () => {
    setModelOpen(false);
  };

  //resume upload
  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  //AadharCard Upload
  const handleAadharCardUpload = (e) => {
    setAadharCard(e.target.files[0]);
  };

  //Pan card Upload
  const handlePanUpload = (e) => {
    setPanCard(e.target.files[0]);
  };

  //Photo Upload
  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  //Core Skills Array
  const handleChange = (event) => {
    setCoreSkills(event.target.value);
  };

  const data = {
    resumeUrl: resumeFile.name,
    gstUrl: photo.name,
    panCardUrl: panCard.name,
    aadharCardUrl: aadharCard.name,
    basicDetails: {
      fullName,
      collegeName,
      email,
      phoneNumber,
      location,
      qualification,
      parentName,
      altContactPersonName,
      altContactPersonNo,
      experienceDetails,
    },
    domain,
    designation,
    internshipPeriod,
    startDate,
    endDate,
    workMode,
    coreSkills,
    bankDetails: {
      bankName: bankName,
      accHolderName: accHolderName,
      accNumber: accNumber,
      branchName: branchName,
      ISFC: isfcCode,
    },
    linkedInUrl,
    spocs: spocDetails,
    rating: 0,
    totalCandidatesHired: 0,
    totalClosures: 0,
    activeFrom: new Date(),
    uid: "",
    requirementAssigned: [],
  };

  // console.log(data);

  const resetDocs = () => {
    setResumeFile([]);
    setPhoto([]);
    setPanCard([]);
    setAadharCard([]);
    setSpocDetails([]);
    setCoreSkills([]);
  };

  const setHandleAllReset = () => {
    setFormData({
      fullName: "",
      collegeName: "",
      email: "",
      phoneNumber: "",
      location: "",
      qualification: "",
      parentName: "",
      altContactPersonName: "",
      altContactPersonNo: "",
      domain: "",
      designation: "",
      internshipPeriod: "",
      workMode: "",
      bankName: "",
      accHolderName: "",
      accNumber: "",
      branchName: "",
      isfcCode: "",
      experienceDetails: "",
      linkedInUrl: "",
    });
    resetDocs();
  };
  //snakbar close
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFieldMissing(false);
    setHandleSuccess(false);
    setFirebaseError(false);
  };

  const handleAddVendor = async () => {
    // e.preventDefault();
    if (exist) {
      // modalClose(true);
      alert("email exist");
      callSnackbar(
        true,
        "This email is already registered, check Employee Profiles",
        "error"
      );
    } else {
      // alert("Doesn't exist");
      if (
        !fullName ||
        !collegeName ||
        !email ||
        !phoneNumber ||
        !location ||
        !qualification ||
        !parentName ||
        !altContactPersonName ||
        !altContactPersonNo ||
        !domain ||
        !designation ||
        !internshipPeriod ||
        !startDate ||
        !endDate ||
        !workMode ||
        !bankName ||
        !accHolderName ||
        !accNumber ||
        !branchName ||
        !isfcCode ||
        !linkedInUrl
      ) {
        callSnackbar(true, "Please ensure to fill all the details", "error");
      } else if (
        panCard.length === 0 ||
        photo.length === 0 ||
        resumeFile.length === 0 ||
        aadharCard.length === 0
      ) {
        callSnackbar(true, "Please Upload NDA Document", "error");
      } else {
        setLoading(true);
        try {
          setHandleSuccess(true);
          setHandleAllReset();
        } catch (err) {
          setFirebaseError(true);
          setHandleAllReset();
          console.log(err.message);
        }
        setLoading(false);
      }
    }
  };
  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1">Edit Profile</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
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
                    label="Full Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="fullName"
                    value={fullName}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    placeholder="Email Address *"
                    label="Email Address *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "This field is required",
                      "Not a valid email ID",
                    ]}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    placeholder="Phone *"
                    label="Phone *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => onChange(e)}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="College Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="collegeName"
                    value={collegeName}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Location *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="location"
                    value={location}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Educational Qualification *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="qualification"
                    value={qualification}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Father/Mother Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="parentName"
                    value={parentName}
                    size="medium"
                    multiline
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Alternate Contact Person Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="altContactPersonName"
                    value={altContactPersonName}
                    size="medium"
                    multiline
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Alternate Contact Person Number  *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="altContactPersonNo"
                    value={altContactPersonNo}
                    size="medium"
                    multiline
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
              </Box>

              <Box width="100%">
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="Experience Details (if any)"
                  // validators={["required"]}
                  // errorMessages={["This field is required"]}
                  name="experienceDetails"
                  value={experienceDetails}
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

            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Internship Details
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box width="32%">
                  <SelectValidator
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                    variant="outlined"
                    label="Domain *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="domain"
                    value={domain}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  >
                    <option></option>
                    <option value={"AI/Machine Learning"}>
                      AI/Machine Learning
                    </option>
                    <option value={"Javascript"}>Javascript</option>
                    <option value={"Python"}>Python</option>
                    <option value={"Cloud"}>Cloud</option>
                    <option value={"Android"}>Android</option>
                    <option value={"Business Management"}>
                      Business Management
                    </option>
                  </SelectValidator>
                </Box>
                <Box width="32%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Designation *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="designation"
                    value={designation}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                  {/* <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="core-skills">Core Skills</InputLabel>
                    <Select
                      labelId="core-skills"
                      id="core-skills-mutiple-checkbox"
                      multiple
                      fullWidth
                      variant="outlined"
                      value={coreSkills}
                      onChange={handleChange}
                      input={<OutlinedInput label="Core Skills" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {skills.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={coreSkills.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Box>
                <Box width="32%">
                  <SelectValidator
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                    variant="outlined"
                    label="Internship Period (in months) *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="internshipPeriod"
                    value={internshipPeriod}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  >
                    <option></option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                  </SelectValidator>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="32%">
                  <TextField
                    id="date-1"
                    label="Start-Date"
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
                      setStartDate(
                        moment(e.target.value).format("YYYY-MM-DD hh:mm:ss a")
                      );
                    }}
                  />
                </Box>
                <Box width="32%">
                  <TextField
                    id="date-1"
                    label="End-Date"
                    type="date"
                    fullWidth
                    defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                    variant="outlined"
                    sx={{ width: 180 }}
                    inputProps={{
                      min: moment(startDate).format("YYYY-MM-DD"),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.dateStyle}
                    onChange={(e) => {
                      setEndDate(
                        moment(e.target.value).format("YYYY-MM-DD hh:mm:ss a")
                      );
                    }}
                  />
                </Box>
                <Box width="32%">
                  <SelectValidator
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                    variant="outlined"
                    label="WorkMode *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="workMode"
                    value={workMode}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  >
                    <option></option>
                    <option value={"Work From Home"}>Work From Home</option>
                    <option value={"Reporting to Office"}>
                      Reporting to Office
                    </option>
                  </SelectValidator>
                </Box>
              </Box>
            </Paper>

            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Bank Details
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box width="100%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Bank Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="bankName"
                    value={bankName}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Account Holder Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="accHolderName"
                    value={accHolderName}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Account Number *"
                    type="number"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="accNumber"
                    value={accNumber}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Branch Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="branchName"
                    value={branchName}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="ISFC Code *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="isfcCode"
                    value={isfcCode}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Add Primary Contact Details
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Full Name *"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="spoc1Name"
                    value={spoc1Name}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>

                <Box width="48%">
                  <TextValidator
                    placeholder="Phone Number *"
                    label="Phone Number *"
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="spoc1Phone"
                    value={spoc1Phone}
                    onChange={(e) => onChange(e)}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "This field is required",
                      "Not a valid email ID",
                    ]}
                  />
                </Box>
              </Box>
              <Box width="100%">
                <TextValidator
                  placeholder="Email Address *"
                  label="Email Address *"
                  className={classes.mb3}
                  fullWidth
                  variant="outlined"
                  name="spoc1Email"
                  value={spoc1Email}
                  onChange={(e) => onChange(e)}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Not a valid email ID",
                  ]}
                />
              </Box>
            </Paper> */}

            {/* <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Add Secondary Contact Details
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextValidator
                    fullWidth
                    variant="outlined"
                    label="Full Name"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    name="spoc2Name"
                    value={spoc2Name}
                    className={classes.mb3}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </Box>

                <Box width="48%">
                  <TextValidator
                    placeholder="Phone Number "
                    label="Phone Number "
                    className={classes.mb3}
                    fullWidth
                    variant="outlined"
                    name="spoc2Phone"
                    value={spoc2Phone}
                    onChange={(e) => onChange(e)}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "This field is required",
                      "Not a valid email ID",
                    ]}
                  />
                </Box>
              </Box>
              <Box width="100%">
                <TextValidator
                  placeholder="Email Address "
                  label="Email Address "
                  className={classes.mb3}
                  fullWidth
                  variant="outlined"
                  name="spoc2Email"
                  value={spoc2Email}
                  onChange={(e) => onChange(e)}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Not a valid email ID",
                  ]}
                />
              </Box>
            </Paper> */}

            <Paper
              style={{
                padding: "20px 40px 20px 40px",
                margin: "20px 0 20px 0",
                borderRadius: "3",
              }}
              elevation={3}
            >
              <Typography variant="h2" className={classes.mb3}>
                Attachments
              </Typography>
              <Box width="100%">
                <TextValidator
                  fullWidth
                  variant="outlined"
                  label="LinkedIn Profile URL *"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  name="linkedInUrl"
                  value={linkedInUrl}
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
                    startIcon={<PublishIcon />}
                  >
                    Upload Resume
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleResumeUpload(e)}
                    />
                  </Button>
                  <Typography>{resumeFile.name}</Typography>
                </Box>
                <Box width="48%">
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="mT20"
                    component="label"
                    startIcon={<PublishIcon />}
                  >
                    Upload Aadhar Card
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleAadharCardUpload(e)}
                    />
                  </Button>
                  <Typography>{aadharCard.name}</Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="mT20"
                    component="label"
                    startIcon={<PublishIcon />}
                  >
                    Upload PAN Card
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handlePanUpload(e)}
                    />
                  </Button>
                  <Typography>{panCard.name}</Typography>
                </Box>
                <Box width="48%">
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="mT20"
                    component="label"
                    startIcon={<PublishIcon />}
                  >
                    Upload Professional Photo
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handlePhotoUpload(e)}
                    />
                  </Button>
                  <Typography>{photo.name}</Typography>
                </Box>
              </Box>
            </Paper>

            <Grid container spacing={4}>
              <Grid item lg={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  className="mT20"
                  onClick={() => {
                    // setModelOpen(true);
                    handleAddVendor();
                  }}
                >
                  Save Details
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
      </Grid>
      <Dialog
        open={modelOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={modalClose}
      >
        <DialogContent className={classes.modalContainer}>
          {/* <Typography variant="subtitle1" className="mB10">
            <b>Confirm Logout</b>
          </Typography> */}
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.mb3}
          >
            Are you sure you want Add Vendor?
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={modalClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleAddVendor}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={fieldMissing}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Please fill all the details!
        </Alert>
      </Snackbar>
      <Snackbar
        open={handleSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Vendor Added successfull!
        </Alert>
      </Snackbar>
      <Snackbar
        open={firebaseError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Something went wrong, please try again!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
