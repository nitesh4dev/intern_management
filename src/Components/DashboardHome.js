import React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import DashCards from "./dashcomponents/DashCards";

export default function DashboardHome() {
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
          <DashCards />
        </Grid>
        {/* <Grid item lg={12} md={12} xs={12}>
          <DashboardTable />
        </Grid> */}
      </Grid>
    </Container>
  );
}
