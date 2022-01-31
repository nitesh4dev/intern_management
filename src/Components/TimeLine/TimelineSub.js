import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  hexToRgb,
} from "@material-ui/core";
import TimelineChart from "./TimellineChart";
import TimelineBubble from "./TimelineBubble";
import TimelineCards from "./TimelineCards";
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

    height: "430px",
  },
  card: {
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    padding: theme.spacing(4, 3),
    marginBottom: "40px",
    width: "100%",
    height: "550px",
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
export default function TimelineSub() {
  const classes = useStyles();
  const {} = useContext(DataContext);
  let colours = [
    "#FA2609",
    "#334756",
    "#DA0037",
    "#CECECE",
    "#FFA000",
    "#57fc3a",
    "#d40416",
  ];

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
              //   value={shift}
              //   onChange={(e) => setShift(e.target.value)}
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
              //   onChange={(e) => {
              //     setStartTime(e.target.value + startMilli);
              //   }}
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
              //   onChange={(e) => {
              //     setEndTime(e.target.value + endMilli);
              //   }}
              sx={{ width: 150 }}
            />
          </Box>
        </Box>
      </div>
      <Box style={{ marginBottom: "15px" }}>
        <TimelineCards />
      </Box>

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Trucks Handled"
            />
            <CardContent>
              <TimelineChart
                locationWiseData={[60, 60, 70, 80, 7, 8]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Docked Time"
            />
            <CardContent>
              <TimelineBubble
                locationWiseData={[60, 60, 70, 80, 7, 8]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
