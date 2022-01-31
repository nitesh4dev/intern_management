import React from "react";
import { Container, Grid, Typography, Box } from "@material-ui/core";

import moment from "moment";

import AttendanceCards from "./allattended/AttendanceCards";
import LocationWiseAttendance from "./allattended/LocationWiseAttendance";

export default function DashComponents() {
  const todaysDate = moment().format(" Do MMMM YYYY");

  return (
    <Container>
      <Grid container spacing={1} xs={12}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1" className="mB10">
            Dock Utilization
          </Typography>
          {/* <Typography mv={20}>{todaysDate}</Typography> */}
        </Grid>

        <Grid item xs={12}>
          <Box>
            <LocationWiseAttendance />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
