import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
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
import AnalyticsBarGraph from "./dashcomponents/AnalyticsBarGraph";

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
export default function Analytics() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");

  const { title, colours } = useContext(DataContext);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1" className="mB20">
            {title}
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Table>
            <TableRow>
              <TableCell align="center" style={{ backgroundColor: "#fff" }}>
                OverAll NCR
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#FA2609", color: "#fff" }}
              >
                10
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#444444", color: "#fff" }}
              >
                07
              </TableCell>
              <TableCell
                align="center"
                style={{ backgroundColor: "#868686", color: "#fff" }}
              >
                19
              </TableCell>
            </TableRow>
          </Table>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Legacy - Plan vs Actual"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "Plan (Parts)",
                    data: [168, 950, 976, 1120],
                  },
                  {
                    name: "Actual (Parts)",
                    data: [169, 945, 971, 1117],
                  },
                ]}
                categories={["Q1", "Q2 ", "Oct'21", "Noc'21"]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="Legacy PHR - NCR status"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "G",
                    data: [4, 1, 6, 3, 3],
                  },
                  {
                    name: "R ",
                    data: [0, 0, 0, 0, 2],
                  },
                  {
                    name: "Y ",
                    data: [0, 0, 1, 1, 4],
                  },
                ]}
                categories={[
                  "ME",
                  "SQA ",
                  "Store Engg.",
                  "Stores",
                  "Supplier/Buyer",
                ]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="NPI - Plan vs Actual"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "Plan (Parts)",
                    data: [12, 21, 29, 41],
                  },
                  {
                    name: "Actual (Parts) ",
                    data: [12, 20, 27, 0],
                  },
                ]}
                categories={["Q1", "Q2 ", "Q3", "Q4"]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="NPI PHR - NCR status"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "G",
                    data: [2, 2, 2, 3, 0],
                  },
                  {
                    name: "R ",
                    data: [0, 0, 0, 3, 0],
                  },
                  {
                    name: "Y ",
                    data: [0, 0, 0, 0, 2],
                  },
                ]}
                categories={[
                  "ME",
                  "SQA ",
                  "Store Engg.",
                  "Supplier/Buyer",
                  "Design",
                ]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="CA Parts - Plan vs Actual"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "Plan (Parts)",
                    data: [55, 64, 74],
                  },
                  {
                    name: "Actual (Parts) ",
                    data: [44, 57, 65],
                  },
                ]}
                categories={["Sep'21", "Oct'21 ", "Nov'21"]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} md={12} xs={12}>
          <Card elevation={2}>
            <CardHeader
              titleTypographyProps={{ variant: "h3" }}
              title="CA PHR - NCR status"
            />
            <CardContent>
              <AnalyticsBarGraph
                series={[
                  {
                    name: "G",
                    data: [1, 1, 3, 3, 0],
                  },
                  {
                    name: "R ",
                    data: [1, 0, 0, 1, 0],
                  },
                  {
                    name: "Y ",
                    data: [1, 2, 1, 4, 1],
                  },
                ]}
                categories={[
                  "ME",
                  "Store Engg.",
                  "Stores ",
                  "Supplier/Buyer",
                  "Design",
                ]}
                colours={colours}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
