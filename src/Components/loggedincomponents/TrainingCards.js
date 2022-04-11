import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  LinearProgress,
  Box,
  makeStyles,
  withStyles,
  IconButton,
} from "@material-ui/core";
import { PeopleAltOutlined } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { DataContext } from "../../Context/DataContext";
import hrimage from "../../assets/images/hrimage.jpeg";
import teamsimage from "../../assets/images/teamsimage.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "350px",
    maxHeight: "400px",
  },
  card: {
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
  },
  cardStyle: {
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    textDecoration: "none",
    color: "black",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    height: "200px",
    backgroundColor: "#ECECEC",
  },
}));

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

export default function TrainingCards({
  totalTrucksDocked,
  dockOccupancy,
  totalOffloadingCycles,
}) {
  const classes = useStyles();
  const { setTitle } = useContext(DataContext);
  const history = useHistory();

  const redirectFunc = (id) => {
    history.push(`/loggedin/training-videos/${id}`);
  };

  return (
    <>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Trainings
      </Typography>
      <Grid container spacing={5}>
        <Grid item lg={4} md={4} xs={12}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="HR Training Image"
              height="140"
              image={hrimage}
              title="HR Training Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                HR Policies
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This training module is to make you aware of the company
                policies.
              </Typography>
            </CardContent>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: " 15px",
                columnGap: "10px",
              }}
            >
              <Box flex={1}>
                <EffectiveProgressBar variant="determinate" value="50" />
              </Box>
              <Button
                size="small"
                color="primary"
                style={{ flex: "1" }}
                onClick={() => redirectFunc("HR-Policies")}
              >
                Continue
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="HR Training Image"
              height="140"
              image={teamsimage}
              title="HR Training Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Microsoft Teams
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This module will help you collaborate, work and manage projects
                with Microsoft Teams.
              </Typography>
            </CardContent>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: " 15px",
                columnGap: "10px",
              }}
            >
              <Box flex={1}>
                <EffectiveProgressBar variant="determinate" value="50" />
              </Box>
              <Button
                size="small"
                color="primary"
                style={{ flex: "1" }}
                onClick={() => redirectFunc("Microsoft-Teams")}
              >
                Continue
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
