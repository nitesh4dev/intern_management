import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";

export default function DataProvide({ children }) {
  const [title, setTitle] = useState("Home");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    db.collection("ClientID")
      .get()
      .then((snapshot) => {});
  }, []);

  // TOPIC: Check if any of your application's deadline is over, if they are then change the application status to reject, assignment status to not submitted. Disable the submit button.
  useEffect(() => {}, []);
  return (
    <DataContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        title,
        setTitle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export const DataContext = createContext();
