import React, { createContext, useState } from "react";

export const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [snackbarState, setSnackbarState] = useState({
    snackbarOpen: false,
    snackbarType: "",
    snackbarMessage: "hello",
  });
  const { snackbarOpen, snackbarMessage, snackbarType } = snackbarState;

  const callSnackbar = (openSnack, msg, type) => {
    setSnackbarState({
      snackbarOpen: openSnack,
      snackbarType: type,
      snackbarMessage: msg,
    });
  };
  return (
    <SnackbarContext.Provider
      value={{
        snackbarMessage,
        snackbarOpen,
        snackbarType,
        callSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}
