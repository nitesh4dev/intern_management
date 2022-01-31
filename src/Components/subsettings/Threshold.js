import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/Firebase";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  Button,
  InputLabel,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { DataContext } from "../../Context/DataContext";
// import { Alert } from "@material-ui/lab";

export default function Threshold() {
  const { expected, expectedFunc } = useContext(DataContext);
  const [expectedVal, setExpectedVal] = useState(0);

  const onChange = (e) => {
    setExpectedVal(e.target.value);
  };

  const HandleSubmit = () => {
    expectedFunc(expectedVal);
  };

  return (
    <Grid>
      <Typography variant="h1" align="center">
        Expected Value
      </Typography>
      <Typography variant="h4" align="center" className="mB20">
        {expected}
      </Typography>
      <Typography variant="subtitle1" align="center">
        Set Expected Value
      </Typography>
      <Box mx="auto" style={{ maxWidth: "200px" }} align="center">
        <form>
          <TextField
            id="outlined-basic"
            defaultValue={expected}
            onChange={(e) => onChange(e)}
            label="Expected Value"
            variant="outlined"
            margin="normal"
          />
          {/* <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel fullWidth>Expected Value</InputLabel>
            <Select
              native
              name="current"
              defaultvalue={expected}
              onChange={(e) => onChange(e)}
              label="Sensitivity level"
            >
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Select>
          </FormControl> */}
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => HandleSubmit(e)}
            disabled={false}
            fullWidth
          >
            Set Value
          </Button>
        </form>
      </Box>
      {/* <Snackbar
        open={saveSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Threshold Level Changed!
        </Alert>
      </Snackbar> */}
    </Grid>
  );
}
