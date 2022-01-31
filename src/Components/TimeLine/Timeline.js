import React from "react";
import { Container, Grid, Typography, Box } from "@material-ui/core";

import moment from "moment";

import TimelineCards from "./TimelineCards";

import TimelineSub from "./TimelineSub";

export default function Timeline() {
  const todaysDate = moment().format(" Do MMMM YYYY");

  return (
    <Container>
      <Grid container spacing={1} xs={12}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1" className="mB10">
            Dock - Peak Hours
          </Typography>
          {/* <Typography mv={20}>{todaysDate}</Typography> */}
        </Grid>

        <Grid item xs={12}>
          <Box>
            <TimelineSub />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
