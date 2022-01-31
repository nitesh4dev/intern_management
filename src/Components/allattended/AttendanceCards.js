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

export default function AttendanceCards({
  totalProductiveHours,
  totalIdleHours,
  totalWorkersDetected,
  totalOffloadingCycles,
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item lg={4} md={4} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#26D383", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
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
      <Grid item lg={4} md={4} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#FA2609", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
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
      <Grid item lg={4} md={4} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#FFA000", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
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
      {/* <Grid item lg={3} md={3} xs={12}>
        <Card className={classes.card}>
          <div className={classes.cardStyle}>
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#6ac3fd", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Offloading Cycles
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalOffloadingCycles}</b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid> */}
    </Grid>
  );
}
