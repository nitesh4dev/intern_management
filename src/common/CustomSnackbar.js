import React, { useState, useContext } from "react";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SnackbarContext } from "../Context/SnackbarContext";
export default function CustomSnackBar() {
  const { snackbarOpen, snackbarType, snackbarMessage, callSnackbar } =
    useContext(SnackbarContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    callSnackbar(false, snackbarType, snackbarMessage);
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarType}>
          <Typography variant="subtitle2"> {snackbarMessage}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
