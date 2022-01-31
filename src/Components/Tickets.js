import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Container,
  withStyles,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import AttendanceGraph from "./allattended/AttendanceGraph";
import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";
import DashboardCards from "./allattended/DashboardCards";
import WorkerTimeTrends from "./allattended/WorkerTimeTrends";
import DashboardCards2 from "./allattended/DashboardCards2";
import { DataContext } from "../Context/DataContext";
import Truckcards from "./allattended/Truckcards";
import DashboardTable from "./dashcomponents/DashboardTable";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import WarningIcon from "@material-ui/icons/Warning";
import TicketsDataTable from "./dashcomponents/TicketsDataTable";

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
const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    "&$selected": {
      color: "#F72A1F",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#F72A1F",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
export default function Tickets() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");

  const { title } = useContext(DataContext);
  const [resolve, setResolve] = useState(false);
  const [status, setStatus] = useState("in progress");
  const [statusColor, setStatusColor] = useState("yellow");
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resolveFunc = () => {
    setResolve(!resolve);
    setStatus("resolved");
    setStatusColor("lightgreen");
  };

  return (
    <Container>
      {/* <Grid item lg={12} xs={12}>
        <Typography variant="h1" className="mB20">
          Truck Dock Utilization and Staff Productivity Analytics
        </Typography>
        <Typography mv={20}>{todaysDate}</Typography>
      </Grid> */}
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Box className={classes.boxStyles}>
            <Typography variant="h1" className="mB20">
              Ticket Details
            </Typography>
            <IconButton color="primary" component="span">
              <CloudDownloadIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <CardHeader
                avatar={
                  <Avatar style={{ backgroundColor: "#FA2609" }}>
                    <WarningIcon />
                  </Avatar>
                }
                titleTypographyProps={{ variant: "h3" }}
                title="Ticket Number: 1"
                subheader="Assigned Dept: Department A"
              />
              <Typography
                variant="body2"
                style={{
                  backgroundColor: `${statusColor}`,
                  marginRight: "20px",
                  padding: "3px 5px",
                }}
              >
                {status}
              </Typography>
            </Box>
            <Divider />

            <CardContent>
              <Box
                className={classes.boxStyles}
                style={{ marginBottom: "20px" }}
              >
                <Typography variant="body1">
                  <b>Created By:</b> Pawan Kumar
                </Typography>
                <Typography variant="body1">
                  <b>Created On:</b> 18th December 2021
                </Typography>
                <Typography variant="body1">
                  <b>Due Date:</b> 19th December 2021
                </Typography>
              </Box>
              <Typography variant="body1">
                <b>Issue Title:</b> Scratch Marks on Rim
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "20px" }}>
                <b>Issue Category:</b> Scratch Marks
              </Typography>
              <Typography variant="body1">
                <b>Issue Description:</b> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "right", marginRight: "5px" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={resolveFunc}
              >
                Mark As Resolved
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Container>
          <Grid container>
            <Grid item lg={12}>
              <AntTabs value={value} onChange={handleChange}>
                <AntTab label="NCR Images" />
                <AntTab label="NCR Checklist" />
                <AntTab label="NCR Attendance" />
                <AntTab label="Customer Status" />
                <AntTab label="Closure Images" />
              </AntTabs>
              <div style={{ marginTop: "3%" }}>
                <TabPanel value={value} index={0}>
                  <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://previews.123rf.com/images/amicc/amicc1806/amicc180600006/103309539-car-sport-rims-and-tyres-shown-at-tyre-shop-.jpg"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://previews.123rf.com/images/amicc/amicc1806/amicc180600006/103309539-car-sport-rims-and-tyres-shown-at-tyre-shop-.jpg"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://previews.123rf.com/images/amicc/amicc1806/amicc180600006/103309539-car-sport-rims-and-tyres-shown-at-tyre-shop-.jpg"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://previews.123rf.com/images/amicc/amicc1806/amicc180600006/103309539-car-sport-rims-and-tyres-shown-at-tyre-shop-.jpg"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <Grid container>
                    <Grid item lg={12} md={12} sx={12}>
                      <Card>
                        <CardHeader
                          titleTypographyProps={{ variant: "h3" }}
                          title="NCR Checklist"
                          subheader="List of things to be checked"
                        />
                        <CardContent>
                          <Box
                            className={classes.boxStyles}
                            style={{ justifyContent: "space-evenly" }}
                          >
                            <Box>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 1"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 2"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 3"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 4"
                                />
                              </FormGroup>
                            </Box>
                            <Box>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 5"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 6"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 7"
                                />
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Checkitem 8"
                                />
                              </FormGroup>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <TicketsDataTable />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <TicketsDataTable />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://rukminim1.flixcart.com/image/612/612/kuh9yfk0/bike-tyre-rim/t/e/1/1-1800-new-honda-activa-model-4g-5g-linx-original-imag7h4haywehcjh.jpeg?q=70"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://rukminim1.flixcart.com/image/612/612/kuh9yfk0/bike-tyre-rim/t/e/1/1-1800-new-honda-activa-model-4g-5g-linx-original-imag7h4haywehcjh.jpeg?q=70"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://rukminim1.flixcart.com/image/612/612/kuh9yfk0/bike-tyre-rim/t/e/1/1-1800-new-honda-activa-model-4g-5g-linx-original-imag7h4haywehcjh.jpeg?q=70"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={3} md={6} sx={12}>
                      <Card elevation={2}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://rukminim1.flixcart.com/image/612/612/kuh9yfk0/bike-tyre-rim/t/e/1/1-1800-new-honda-activa-model-4g-5g-linx-original-imag7h4haywehcjh.jpeg?q=70"
                          alt="wheel rim"
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
}
