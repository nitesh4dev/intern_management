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
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import AttendanceGraph from "./allattended/AttendanceGraph";
import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";
import DashboardCards from "./allattended/DashboardCards";
import WorkerTimeTrends from "./allattended/WorkerTimeTrends";
import DashboardCards2 from "./allattended/DashboardCards2";
import { DataContext } from "../Context/DataContext";
import Truckcards from "./allattended/Truckcards";
import DashboardTable from "./dashcomponents/DashboardTable";

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
export default function DashboardHome() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");

  const { title } = useContext(DataContext);

  return (
    <Container>
      {/* <Grid item lg={12} xs={12}>
        <Typography variant="h1" className="mB20">
          Truck Dock Utilization and Staff Productivity Analytics
        </Typography>
        <Typography mv={20}>{todaysDate}</Typography>
      </Grid> */}
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1" className="mB20">
            Welcome to ResoluteAI Internships
          </Typography>
        </Grid>
        {/* <Grid item lg={6} xs={12}>
          <Typography
            variant="h3"
            className="mB20"
            style={{ textAlign: "right" }}
          >
            {todaysDate}
          </Typography>
        </Grid> */}
        <Grid item lg={12} xs={12}>
          <Truckcards />
        </Grid>
        {/* <Grid item lg={12} md={12} xs={12}>
          <DashboardTable />
        </Grid> */}
      </Grid>
    </Container>
  );
}
