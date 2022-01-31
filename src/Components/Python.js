import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Container,
  withStyles,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";
import { DataContext } from "../Context/DataContext";

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
  boxStyles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
})(Tabs);

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
export default function Python() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");

  const { title } = useContext(DataContext);
  const [resolve, setResolve] = useState(false);
  const [status, setStatus] = useState("in progress");
  const [statusColor, setStatusColor] = useState("yellow");
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resolveFunc = () => {
    setResolve(!resolve);
    setStatus("resolved");
    setStatusColor("lightgreen");
  };

  return (
    <Container>
      <Grid item lg={12} xs={12}>
        <Typography variant="h1" className="mB20">
          {title}
        </Typography>
      </Grid>
    </Container>
  );
}
