import {
  Card,
  CardContent,
  Grid,
  Badge,
  Box,
  Slide,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import Agreement from "./Agreement";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { Check, Close } from "@material-ui/icons";
import DocumentIcon from "../../common/DocumentIcon";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "30px",
  },

  linkStyle: {
    textDecoration: "none",
    "&:visited": {
      color: "black",
    },
    "&:visited": {
      color: "black",
    },
  },
}));

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Document = () => {
  const classes = useStyles();
  const [index, setIndex] = useState("");
  const [dataState, setDataState] = useState([
    {
      documentTitle: "AadharCard.pdf",
      agreed: false,
      documentURL: "www.afadf.com",
    },
    {
      documentTitle: "PANCard.pdf",
      agreed: false,
      documentURL: "www.afadf.com",
    },
    {
      documentTitle: "Photo.jpeg",
      agreed: false,
      documentURL: "www.afadf.com",
    },
    {
      documentTitle: "Resume.pdf",
      agreed: false,
      documentURL: "www.afadf.com",
    },
  ]);

  //Modal state
  const [modelOpen, setModelOpen] = useState(false);
  const modalClose = () => {
    setModelOpen(false);
    setIndex("");
  };

  const agreeFunc = (indextoChange) => {
    // Check if terms are already agreed for the particular document
    if (dataState[indextoChange].agreed) {
      return;
    }
    const newData = dataState.map((val, index) => {
      let obj = val;
      if (indextoChange === index) {
        obj = { ...obj, agreed: true };
      }
      return obj;
    });
    setDataState(newData);
  };

  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Documents
      </Typography>
      <Card>
        <CardContent>
          {/* <Agreement /> */}

          <Grid container spacing={3}>
            {dataState.map((val, index) => {
              return (
                <>
                  <Grid item lg={2} md={3} xs={6} key={index}>
                    <Box style={{ textAlign: "center" }}>
                      {val.agreed ? (
                        <a
                          className={classes.linkStyle}
                          href={val.documentURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <DocumentIcon
                            setIndex={setIndex}
                            index={index}
                            setModelOpen={setModelOpen}
                            fileData={val}
                          />
                        </a>
                      ) : (
                        <DocumentIcon
                          setIndex={setIndex}
                          index={index}
                          setModelOpen={setModelOpen}
                          fileData={val}
                        />
                      )}
                    </Box>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={modelOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={modalClose}
      >
        <DialogContent className={classes.modalContainer}>
          <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
            <b>Terms and Conditions</b>
          </Typography>

          <Typography
            variant="body1"
            style={{ marginBottom: "10px", justifyContent: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={modalClose}
              >
                Decline
              </Button>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  agreeFunc(index);
                  modalClose();
                }}
              >
                Agree
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Document;
