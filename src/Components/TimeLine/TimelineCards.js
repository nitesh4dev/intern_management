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

export default function TimelineCards() {
  const classes = useStyles();

  const DateFunction = (time) => {
    const split = time.split(":");
    return new Date(2020, 1, 1, split[0], split[1]);
  };

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
                Total Productive Hours
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>78</b>
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
                <b>12</b>
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
                Total Idle Hours
              </Typography>
              <Typography variant="subtitle2" className="colorBlack">
                <b>22</b>
              </Typography>
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}
