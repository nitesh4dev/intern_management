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
// import { Grid } from '@mui/material';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Yard } from "@mui/icons-material";

import { db } from "../../firebase/Firebase";
import {collection, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
import { getAuth, updateProfile } from 'firebase/auth'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:'450px',
};



function getMonthNumber(monthName) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === monthName.toLowerCase());

  // If the provided month name is valid, return the corresponding month number (0-indexed)
  if (monthIndex !== -1) {
    return monthIndex + 1;
  } else {
    // Return -1 or throw an error if the month name is not valid
    return -1;
  }
}



const RModal = ({date, month, year}) => {
  console.log("date is = " + date+ "month is = "+month+"year is = "+ year);
  const [rDate, setRDate] = useState(new Date(year,getMonthNumber(month)-1,date))
  console.log(rDate)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Pawan', 'Piyush', 'Suman'];
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const regularizationCollectionRef = collection(db, "regularization");

  console.log(getAuth().currentUser.displayName)

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth()


    const obj = {
      // taskid: taskID,
     
      askingDate:rDate,
      applyDate: new Date(),
      name: inputValue,
      manager:selectedOption,
      reason:textareaValue,
      status:false
      
  }

       
  await addDoc(regularizationCollectionRef,obj)
    
    

    handleClose();
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };



  return (
    <div  >
      <button
        style={{
          position: "absolute",
          top: "46px",
          left: "53px",
          // border: "black solid 1px",
          // borderRadius: "50%",
          // cursor: "pointer",
          fontSize: "0.7rem",
          padding: "4px 4px",
          // zIndex:"0",
          // height:"20px",
          // backgroundColor:"#ccc",
          
          // visibility:"hidden"
          color:"red",
          fontStyle:"bolder",
          fontWeight:"500"

          // display:"flex",
          // justifyContent:"center",
          // alignItems:"center"
          


        }}
        onClick={handleOpen}
      > <strong>REG</strong>  </button>
    
    <Modal style={{alignItems:"center"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1 style={{ textAlign: "center" }}>Regularization Form</h1>
    
        <br />
        <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
        <Autocomplete
        freeSolo
        options={options}
        onChange={(event, newValue) => setSelectedOption(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Select Manager" variant="outlined" required />
        )}
      />
<br />


<Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="firstName"
              variant="outlined"
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          </ Grid>
    
    <br />
      {/* Input field */}
      <TextField
        // minRows={3}
        placeholder="Enter the Reason"
        label="Reason"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={textareaValue}
       
        onChange={handleTextareaChange}
        // style={{ width: '100%', resize: 'none' }}
     

        required
      />
<br />
<br />

      {/* Submit button */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        // style={{ marginLeft: 8 }}
      >
        Submit
      </Button>
    </form>

  
        </Box>
      </Modal>







    </div >
  );
};


export default RModal;
