import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase/Firebase";
import firebase from "firebase/compat";
import moment from "moment";

export default function DataProvide({ children }) {
  const [title, setTitle] = useState("Home");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expected, setExpected] = useState(10);
  const expectedFunc = (e) => {
    setExpected(e);
  };

  let colours = [
    "#FA2609",
    "#444444",
    "#868686",
    "#EDEDED",
    "#FFA000",
    "#57fc3a",
    "#d40416",
  ];
  useEffect(() => {
    db.collection("ClientID")
      .get()
      .then((snapshot) => {});
  }, []);

  return (
    <DataContext.Provider
      value={{
        expected,
        expectedFunc,
        open,
        handleOpen,
        handleClose,
        title,
        setTitle,
        colours,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export const DataContext = createContext();
