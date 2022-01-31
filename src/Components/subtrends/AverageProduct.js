import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  hexToRgb,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import clsx from "clsx";

import Average from "./Average";
import ExpectedTime from "./ExpectedTime";
import Achieved from "./Achieved";
import TotalProductive from "./TotalProductive";
import { db } from "../../firebase/Firebase";
import firebase from "firebase/compat";
import AttendanceCards from "../allattended/AttendanceCards";
import WorkerEfficiencyTrend from "./WorkerEfficiencyTrend";
import ProductiveIdleStaffTrend from "../allattended/ProductiveIdleStaffTrend";
import { DataContext } from "../../Context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",

    height: "500px",
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
  },
  cardss: {
    padding: theme.spacing(4, 3),
    marginBottom: "40px",
    width: "100%",
    height: "500px",
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datetimeBox: {
    marginRight: "20px",
  },
}));
export default function LocationWiseAttendance() {
  const classes = useStyles();

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    startMilli,
    endMilli,
    shift,
    setShift,
    totalProductiveHours,
    totalIdleHours,
    totalWorkersDetected,
    totalOffloadingCycles,
    timeIds,
    efficiencies,
    productiveStaff,
    idleStaff,
    colours,
  } = useContext(DataContext);

  const startTimeFunc = (e) => {
    let time = e.target.value;
    let result = time.substring(11);
    setStartTime(result + startMilli);
  };

  const endTimeFunc = (e) => {
    let time = e.target.value;
    let result = time.substring(11);
    setEndTime(result + endMilli);
  };

  return (
    <>
      <div
        className="header"
        style={{ display: "block", marginBottom: "20px" }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" style={{ marginRight: "20px" }}>
              Shift:{" "}
            </Typography>{" "}
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="A"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <FormControlLabel
                value="A"
                control={<Radio color="primary" size="small" />}
                label="A"
                labelPlacement="end"
              />
              <FormControlLabel
                value="B"
                control={<Radio color="primary" size="small" />}
                label="B"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Both"
                control={<Radio color="primary" size="small" />}
                label="Both"
                labelPlacement="end"
              />
            </RadioGroup>
          </Box>
          <Box>
            <TextField
              id="datetime-local"
              label="Start Time"
              type="datetime-local"
              defaultValue="2021-11-23T18:55"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: "2021-11-23T18:55",
                max: "2021-11-24T19:00",
              }}
              onChange={(e) => startTimeFunc(e)}
              sx={{ width: 150 }}
              className={classes.datetimeBox}
            />
            <TextField
              id="datetime-local"
              label="End Time"
              type="datetime-local"
              defaultValue="2021-11-24T19:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: "2021-11-23T18:55",
                max: "2021-11-24T19:00",
              }}
              onChange={(e) => endTimeFunc(e)}
              sx={{ width: 150 }}
            />
          </Box>
        </Box>
      </div>
      <Box style={{ marginBottom: "15px" }}>
        <AttendanceCards
          totalProductiveHours={totalProductiveHours}
          totalIdleHours={totalIdleHours}
          totalWorkersDetected={totalWorkersDetected}
          totalOffloadingCycles={totalOffloadingCycles}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title=" Average Productive Time and Idle Time per worker"
            />
            <CardContent>
              <Average
                totalProductiveHours={totalProductiveHours}
                totalWorkersDetected={totalWorkersDetected}
                totalIdleHours={totalIdleHours}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Total Productive and Idle Time"
            />
            <CardContent>
              <TotalProductive
                totalProductiveHours={totalProductiveHours}
                totalIdleHours={totalIdleHours}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Blue Collar Worker Efficiency Trend"
            />
            <CardContent>
              <WorkerEfficiencyTrend
                timeIds={timeIds}
                efficiencies={efficiencies}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Productive Staff and Idle Staff Trend"
            />
            <CardContent>
              <ProductiveIdleStaffTrend
                timeIds={timeIds}
                productiveStaff={productiveStaff}
                idleStaff={idleStaff}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
