import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { PeopleAltOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
  },
  cardStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#ECECEC",
  },
}));

export default function DashboardCards2({
  totalProductiveHours,
  totalIdleHours,
  totalWorkersDetected,
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#63e3a8", color: "#ffffff" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2753/2753147.png"
                  width={50}
                  height={50}
                ></img>{" "}
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Productive Time
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalProductiveHours} (mins)</b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#fc6854", color: "#ffffff" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4490/4490362.png"
                  width={50}
                  height={50}
                ></img>{" "}
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Workers Detected
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalWorkersDetected} </b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#ffbd4d", color: "#ffffff" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/66/66163.png"
                  width={50}
                  height={50}
                ></img>{" "}
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Idle Time
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalIdleHours} (mins)</b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}
