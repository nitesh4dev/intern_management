import React, { useEffect, useState, useContext, Fragment } from "react";
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

export default function Javascript() {
  const classes = useStyles();
  const todaysDate = moment().format(" Do MMMM YYYY");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [openingList, setOpeningList] = useState();
  const { title } = useContext(DataContext);
  useEffect(() => {
    setIsLoading(true);
    db.collection(`Internships`)
      .where("Domain", "==", "Javascript")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setOpeningList(list);
        setIsLoading(false);
      });
  }, []);
  // TODO:
  const applyFunc = () => {
    history.push("/login");
  };

  return (
    <Container>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {title}
      </Typography>

      <Grid container spacing={3}>
        {openingList?.map((opening, index) => (
          <Grid item lg={12} md={12} xs={12} key={index}>
            <Card elevation={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <CardHeader
                  titleTypographyProps={{ variant: "h4" }}
                  title={opening.Title}
                />
              </Box>
              <Divider />

              <CardContent>
                <Box
                  className={classes.boxStyles}
                  style={{ marginBottom: "20px" }}
                >
                  <Typography variant="body1">
                    <b>Number of Openings: </b> {opening.NumberOfOpenings}
                  </Typography>
                  <Typography variant="body1">
                    <b>Internship Duration:</b> {opening.Duration}
                  </Typography>
                  <Typography variant="body1">
                    <b>Apply by:</b>{" "}
                    {new Date(opening.ApplyBy.seconds * 1000)
                      .toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/ /g, "-")}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  <b>Internship Title:</b> {opening.Title}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "20px" }}>
                  <b>Internship Domain:</b> {opening.Domain}
                </Typography>
                <Typography variant="body1">
                  <b>Internship Description: </b>
                  {opening.Description}
                </Typography>
              </CardContent>
              <CardActions
                style={{ justifyContent: "right", marginRight: "5px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  // onClick={() => applyFunc(index)}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
