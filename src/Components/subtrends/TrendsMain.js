import React, { useState, useContext } from "react";

import {
  Typography,
  withStyles,
  Tabs,
  Tab,
  Box,
  Container,
  TextField,
  Button,
  Grid,
  makeStyles,
  ButtonGroup,
} from "@material-ui/core";

import AverageProduct from "../subtrends/AverageProduct";
import AttendanceCards from "../allattended/AttendanceCards";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
}));

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    "&$selected": {
      color: "#F72A1F",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#F72A1F",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function TrendsMain() {
  const todaysDate = moment().format(" Do MMMM YYYY");

  return (
    // </Container>
    <Container>
      <Grid container spacing={1} xs={12}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h1" className="mB10">
            Blue Collar Worker Efficiency
          </Typography>
          {/* <Typography mv={20}>{todaysDate}</Typography> */}
        </Grid>
        <Grid item xs={12}>
          <Box>
            <AverageProduct />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
