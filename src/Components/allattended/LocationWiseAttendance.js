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
import { useHistory } from "react-router-dom";

import SecondGraph from "./SecondGraph";
import TotalHours from "./TotalHours";
import Offloading from "./Offloading";
import AverageTime from "./AverageTime";
import { db } from "../../firebase/Firebase";
import firebase from "firebase/compat";
import Achieved from "../subtrends/Achieved";
import Truckcards from "./Truckcards";
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
    totalTrucksDocked,
    dockOccupancy,
    totalOffloadingCycles,
    totalWorkersDetected,
    colours,
    avgOffloading,
    avgIdleTime,
    totalDockedHrs,
    docArray,
    totalTrucksArray,
    dockedTime,
    offloadingPerDock,
    idleTimePerDock,
    totalDockedTime,
  } = useContext(DataContext);

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
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: "18:55",
              }}
              onChange={(e) => {
                setStartTime(e.target.value + startMilli);
              }}
              sx={{ width: 150 }}
              className={classes.datetimeBox}
            />
            <TextField
              id="datetime-local"
              label="End Time"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: "19:02",
              }}
              onChange={(e) => {
                setEndTime(e.target.value + endMilli);
              }}
              sx={{ width: 150 }}
            />
          </Box>
        </Box>
      </div>
      <Box style={{ marginBottom: "15px" }}>
        <Truckcards
          totalTrucksDocked={totalTrucksDocked}
          dockOccupancy={dockOccupancy}
          totalOffloadingCycles={totalOffloadingCycles}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Expected and Achieved Offloading Cycles Datewise"
            />
            <CardContent>
              <Achieved
                totalWorkersDetected={totalWorkersDetected}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Average time taken by a Truck"
            />
            <CardContent>
              <AverageTime
                avgOffloading={avgOffloading}
                avgIdleTime={avgIdleTime}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title={`Total Docked Time : ${totalDockedTime} mins`}
            />
            <CardContent>
              <TotalHours totalDockedHrs={totalDockedHrs} colours={colours} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Offloading Cycles and Occupancy in %"
            />
            <CardContent>
              <Offloading
                docArray={docArray}
                totalTrucksArray={totalTrucksArray}
                dockedTime={dockedTime}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Total Trucks Docked"
            />
            <CardContent>
              <AttendanceGraph
                docArray={docArray}
                totalTrucksArray={totalTrucksArray}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Offloading Time and Dock Time"
            />
            <CardContent>
              {/* {offloadingPerDock.length === docArray.length &&
              dockedTime.length === docArray.length &&
              idleTimePerDock.length === docArray.length ? ( */}
              <SecondGraph
                offloadingPerDock={offloadingPerDock}
                idleTimePerDock={idleTimePerDock}
                dockedTime={dockedTime}
                colours={colours}
              />
              {/* ) : (
                <SecondGraph
                  offloadingPerDock={[0, 0, 0, 0]}
                  dockedTime={[0, 0, 0, 0]}
                  colours={colours}
                />
              )} */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
