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

export default function DashboardCards({
  totalTrucksDocked,
  dockOccupancy,
  lowDockOccupancy,
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
                  src="https://cdn-icons-png.flaticon.com/128/4305/4305318.png"
                  width={50}
                  height={50}
                ></img>
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Trucks Docked
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalTrucksDocked}</b>
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
                  src="https://cdn-icons-png.flaticon.com/128/6179/6179395.png"
                  width={50}
                  height={50}
                ></img>
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Total Offloading Cycles
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>{totalTrucksDocked}</b>
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
                  src="https://cdn-icons-png.flaticon.com/128/750/750178.png"
                  width={50}
                  height={50}
                ></img>
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Dock with Highest Occupancy: <b>{dockOccupancy}</b>
              </Typography>
              <Typography className={clsx("mB5", "colorBlack")}>
                Dock with Lowest Occupancy: <b>{lowDockOccupancy}</b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}
