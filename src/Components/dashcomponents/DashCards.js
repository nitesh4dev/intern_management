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
import { DataContext } from "../../Context/DataContext";

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
    textDecoration: "none",
    color: "black",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#ECECEC",
  },
}));

export default function AttendanceCards({
  totalTrucksDocked,
  dockOccupancy,
  totalOffloadingCycles,
}) {
  const classes = useStyles();
  const { setTitle } = useContext(DataContext);

  return (
    <Grid container spacing={5}>
      <Grid item lg={6} md={4} xs={12}>
        <Card className={classes.card}>
          <Link
            className={classes.cardStyle}
            to="/javascript"
            onClick={() => setTitle("Javascript Openings")}
          >
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#26D383", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Javascript Openings
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b></b>
              </Typography>
            </Box>
          </Link>
        </Card>
      </Grid>

      <Grid item lg={6} md={4} xs={12}>
        <Card className={classes.card}>
          <Link
            className={classes.cardStyle}
            to="/python"
            onClick={() => setTitle("Python Openings")}
          >
            <Box className={classes.iconHolder}>
              <IconButton
                style={{ backgroundColor: "#FA2609", color: "#ffffff" }}
              >
                <PeopleAltOutlined />
              </IconButton>
            </Box>
            <Box flexGrow="1">
              <Typography className={clsx("mB5", "colorBlack")}>
                Python Openings
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b></b>
              </Typography>
            </Box>
          </Link>
        </Card>
      </Grid>
    </Grid>
  );
}
