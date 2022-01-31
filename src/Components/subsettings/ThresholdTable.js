import React, { useState, useContext } from "react";
import "firebase/firestore";
import {
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Grid,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Snackbar,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import { Alert } from "@material-ui/lab";

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ThresholdTable() {
  return (
    <Grid>
      <Typography align="center" variant="subtitle1" className="mB20">
        Current Devices
      </Typography>
      {/*  */}
    </Grid>
  );
}
