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

import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";
import { DataContext } from "../Context/DataContext";

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

const internshipDetails = [
  {
    internshipTitle: " Javascript Frontend Developer Intern ",
    noOfOpenings: 1,
    duration: "3 months",
    applyBy: "30th January 2022",
    internshipCategory: "Software Development",
    description:
      "We are looking for Enthusiastic candidates with a problem-solving mindset who believes that it is the skills that matter and not the degree. We at ResoluteaAI.in follow a skill-based approach to hiring the ideal candidate. Skilled interns are offered full-time employment post-internship completion based on Performance and openings.",
  },
  {
    internshipTitle: " Javascript Fullstack Developer Intern ",
    noOfOpenings: 1,
    duration: "3 months",
    applyBy: "30th January 2022",
    internshipCategory: "Software Development",
    description:
      "We are looking for Enthusiastic candidates with a problem-solving mindset who believes that it is the skills that matter and not the degree. We at ResoluteaAI.in follow a skill-based approach to hiring the ideal candidate. Skilled interns are offered full-time employment post-internship completion based on Performance and openings.",
  },
];

export default function Javascript() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");
  const history = useHistory();

  const { title } = useContext(DataContext);

  const applyFunc = () => {
    history.push("/login");
  };

  return (
    <Container>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {title}
      </Typography>
      {/* <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScDYfqMpgUk4h_Q5Wkns6QZmN85qxLz7CkFb8DuhRfTVOgmlA/viewform?embedded=true"
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      >
        Loading…
      </iframe> */}
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <CardHeader
                // avatar={
                //   <Avatar style={{ backgroundColor: "#FA2609" }}>
                //     <WarningIcon />
                //   </Avatar>
                // }
                titleTypographyProps={{ variant: "h4" }}
                title="Javascript Frontend Developer Intern "
              />
            </Box>
            <Divider />

            <CardContent>
              <Box
                className={classes.boxStyles}
                style={{ marginBottom: "20px" }}
              >
                {/* <Typography variant="body1">
                  <b>Number of Openings: </b> 3
                </Typography> */}
                <Typography variant="body1">
                  <b>Internship Duration:</b> 3 months
                </Typography>
                <Typography variant="body1">
                  <b>Apply by:</b> 16th January 2022
                </Typography>
              </Box>
              <Typography variant="body1">
                <b>Internship Title:</b> Javascript Frontend Developer
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "20px" }}>
                <b>Internship Category:</b> Software Development
              </Typography>
              <Typography variant="body1">
                <b>Internship Description:</b> We are looking for Enthusiastic
                candidates with a problem-solving mindset who believes that it
                is the skills that matter and not the degree. We at
                ResoluteaAI.in follow a skill-based approach to hiring the ideal
                candidate. Skilled interns are offered full-time employment
                post-internship completion based on Performance and openings
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "right", marginRight: "5px" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={applyFunc}
              >
                Apply now
                {/* <a
                  href="https://forms.gle/3jY5pTm3Qqb8msJs5"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Apply now
                </a> */}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <CardHeader
                // avatar={
                //   <Avatar style={{ backgroundColor: "#FA2609" }}>
                //     <WarningIcon />
                //   </Avatar>
                // }
                titleTypographyProps={{ variant: "h4" }}
                title="Javascript Fullstack Developer Intern "
              />
            </Box>
            <Divider />

            <CardContent>
              <Box
                className={classes.boxStyles}
                style={{ marginBottom: "20px" }}
              >
                {/* <Typography variant="body1">
                  <b>Number of Openings: </b> 3
                </Typography> */}
                <Typography variant="body1">
                  <b>Internship Duration:</b> 3 months
                </Typography>
                <Typography variant="body1">
                  <b>Apply by:</b> 16th January 2022
                </Typography>
              </Box>
              <Typography variant="body1">
                <b>Internship Title:</b> Javascript Fullstack Developer
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "20px" }}>
                <b>Internship Category:</b> Software Development
              </Typography>
              <Typography variant="body1">
                <b>Internship Description:</b> We are looking for Enthusiastic
                candidates with a problem-solving mindset who believes that it
                is the skills that matter and not the degree. We at
                ResoluteaAI.in follow a skill-based approach to hiring the ideal
                candidate. Skilled interns are offered full-time employment
                post-internship completion based on Performance and openings
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "right", marginRight: "5px" }}
            >
              <Button variant="contained" color="primary" size="small">
                <a
                  href="https://forms.gle/3jY5pTm3Qqb8msJs5"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Apply now
                </a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
