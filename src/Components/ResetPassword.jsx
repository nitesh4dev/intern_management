import React , {useState} from 'react'
// import { sendPasswordResetEmail } from 'firebase/auth'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {auth, db } from "../firebase/Firebase";
import {useHistory} from 'react-router-dom'
import ResoluteAILogo from "../assets/images/resoluteai-logo.png";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


import {
    Grid,
    Hidden,
    Typography,
    makeStyles,
    Box,
    Button,
    Snackbar,
  } from "@material-ui/core";


  
//Custom styling
const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      justifyContent: "center",
    },
 
    formHolder: {
      maxWidth: "390px",
      textAlign: "center",
    },
    textFields: {
      marginBottom: theme.spacing(2),
    },
    heading: {
      padding: theme.spacing(3, 0, 3, 0),
    },
    marginTop3: {
      marginTop: theme.spacing(2),
    },
  }));

const ResetPassword = () => {
    // const navigate = useNavigate();
    const history = useHistory();
    const auth = getAuth();
    const classes = useStyles();
    const [emailValue, setEmailValue] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, emailValue).then(data=>{
            alert("Check your Email..! Password Reset link has been send to your Email. ");
            // navigate('/login')
            // history.push('/login')
            history.goBack();
        }).catch(err =>{
            alert(err.code);
            console.log("error occur")
        })
    }
  return (
    <>
    
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        container
        direction="column"
        justify="center"
      >
        <Box className={classes.formHolder} mx="auto" style={{marginTop:"1rem"}}>
          <img src={ResoluteAILogo} alt="FaceGenieLogo" width="50%" />

          <Box textAlign="center" ></Box>
          <Typography variant="h2" className={classes.heading}>
            Enter your registered email ID
          </Typography>

          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              placeholder="Please enter your email ID"
              label="Email Address"
              className={classes.textFields}
              fullWidth
              variant="outlined"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Not a valid email ID"]}
            />
           
            <Typography align="right" style={{marginBottom:"1rem"}}>
          
          
          
        </Typography>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
             
            >
            Reset Password
            </Button>
          </ValidatorForm>

          
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default ResetPassword