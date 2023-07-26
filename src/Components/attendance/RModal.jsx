import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const RModal = (dataForCalendar) => {
  const [open, setOpen] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState({
    name: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [manager, setManager] = React.useState([{name:'ram'},{name:'ram'},{name:'ram'}]);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2023-06-14'));


  const handleChange = (event) => {
    setManager(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <div>
      <button
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          border: "black solid 1px",
          borderRadius: "5px",
          cursor: "pointer",
          // fontSize: "14px",
          padding: "1px",
          // color:"grey"
          // display:"flex",
          // justifyContent:"center",
          // alignItems:"center"


        }}
        onClick={handleOpen}
      > + </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000000",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "5px",
              maxWidth: "600px",
              width: "100%",
              position: "relative", // Added position for cross button
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              onClick={handleClose}
            >
              &times;
            </button>

            <h2 style={{ textAlign: "center" }}>Regularization Form</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>

              <div sx={{ minWidth: 90, margin: "10px" }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={manager}
                    label="manager"
                    onChange={handleChange}
                  >
                    <MenuItem >Pawan Kumar</MenuItem>
                    <MenuItem value={2}>Parikshit Bangde</MenuItem>
                    <MenuItem value={3}>Piyush Patil</MenuItem>
                  </Select>
                </FormControl>










              </div>

              <div style={{ padding: "10px", display: "flex", flexDirection: "column" }} >
                <TextField
                  required
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue="  Aman Prakash"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />




                <TextField
                  required
                  id="outlined-required"
                  label="Reason"
                  defaultValue=""
                  fullWidth
                  variant="outlined"
                />

              </div>
            </div>

            <Button variant='outlined' onClick={handleSubmit}>Submit </Button>

          </div>
        </div>
      )
      }
    </div >
  );
};


export default RModal;
