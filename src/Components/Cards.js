import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { PeopleAltOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
    width: "80%",
  },
  cardStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    textDecoration: "none",
    color: "black",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#ECECEC",
  },
}));

export default function Cards({ title, link, imageLink }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card} elevation={3}>
        <Link className={classes.cardStyle} to={link}>
          <Box className={classes.iconHolder}>
            <IconButton
              style={{ backgroundColor: "#FA2609", color: "#ffffff" }}
            >
              <img src={imageLink} width={40} height={40} />
            </IconButton>
          </Box>
          <Box flexGrow="1">
            {/* <Typography className={clsx("mB5", "colorBlack")}>
                Present
              </Typography> */}
            <Typography variant="subtitle2" className="colorBlack">
              <b>{title}</b>
            </Typography>
          </Box>
        </Link>
      </Card>
    </>
  );
}
