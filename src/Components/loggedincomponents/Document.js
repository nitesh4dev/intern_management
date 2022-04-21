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
import React, { Fragment, useState, useContext } from "react";
import Agreement from "./Agreement";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { Check, Close, PictureAsPdf } from "@material-ui/icons";
import DocumentIcon from "../../common/DocumentIcon";
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
import { db } from "../../firebase/Firebase";
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
  },
}));

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Document = () => {
  const classes = useStyles();
  const [index, setIndex] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const { user } = useContext(AuthContext);
  const [document, setDocument] = useState([]);
  const [modelFile, setModelFile] = useState();
  const [firstTimeAgreement, setFirstTimeAgreement] = useState(false);
  const [latestDocument, setLatestDocument] = useState();
  // const [latestVersionNo, setLatestVersionNo] = useState();
  //Modal state
  const [modelOpen, setModelOpen] = useState(false);
  const modalClose = () => {
    setModelOpen(false);
    setIndex("");
  };

  const agreeFunc = async (indexToChange) => {
    // Check if terms are already agreed for the particular document
    if (document[indexToChange].agreed) return;
    const newData = document.map((val, index) => {
      let obj = val;
      if (indexToChange === index) {
        obj = { ...obj, agreed: true };
      }
      return obj;
    });
    setDocument(newData);
    const docRef = db.collection("SelectedCandidates").doc(user?.userDocId);
    const querySnapshot = await docRef.get();
    const updatedUserData = querySnapshot.data();
    console.log(updatedUserData);
    if (firstTimeAgreement === true) {
      docRef.update({
        documentDetails: {
          ...updatedUserData.documentDetails,
          version: latestDocument.version,
          docId: latestDocument.docId,
          [newData[indexToChange].documentTitle]: newData[indexToChange].agreed,
        },
      });
      setFirstTimeAgreement(false);
    } else {
      docRef.update({
        documentDetails: {
          ...updatedUserData.documentDetails,
          [newData[indexToChange].documentTitle]: newData[indexToChange].agreed,
        },
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    // If the user hasn't agreed to even one document, then the selected will be false
    // If the users agrees to even one of the document, then inside documentDetails, we will store the version the user has agreed to and fetch that value only.
    // 0 represents that the user hasn't agreed to any document version.
    if (user.userData.documentDetails.version === 0) {
      setFirstTimeAgreement(true);
      const docRef = db.collection("Latests").doc("latestDocumentVersion");
      docRef
        .get()
        .then((querySnapshot) => {
          const latestDocId = querySnapshot.data().docId;
          return db.collection("LegalDocuments").doc(latestDocId).get();
        })
        .then((querySnapshot) => {
          console.log(querySnapshot);
          console.log(querySnapshot.data());
          const latestDocumentData = querySnapshot.data();
          setLatestDocument({
            docId: querySnapshot.id,
            ...querySnapshot.data(),
          });
          console.log(latestDocumentData);
          const data = [
            {
              documentTitle: "NDA",
              documentUrl: latestDocumentData.documentUrls.NDA,
              agreed: false,
            },
            {
              documentTitle: "agreement",
              documentUrl: latestDocumentData.documentUrls.agreement,
              agreed: false,
            },
          ];
          setDocument(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFirstTimeAgreement(false);
      const docRef = db
        .collection("LegalDocuments")
        .doc(user.userData.documentDetails.docId);
      docRef.get().then((querySnapshot) => {
        const documentData = querySnapshot.data();
        const data = [
          {
            documentTitle: "NDA",
            documentUrl: documentData.documentUrls.NDA,
            agreed: user.userData.documentDetails.NDA,
          },
          {
            documentTitle: "agreement",
            documentUrl: documentData.documentUrls.agreement,
            agreed: user.userData.documentDetails.agreement,
          },
        ];
        setDocument(data);
      });
    }
  }, [user]);

  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Documents
      </Typography>
      <Card>
        <CardContent>
          {/* <Agreement /> */}

          <Grid container spacing={3}>
            {document ? (
              document.map((val, index) => {
                return (
                  <>
                    <Grid item lg={2} md={3} xs={6} key={index}>
                      <Box style={{ textAlign: "center" }}>
                        {val.agreed ? (
                          <a
                            className={classes.linkStyle}
                            href={val.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <DocumentIcon
                              setModelFile={setModelFile}
                              setIndex={setIndex}
                              index={index}
                              setModelOpen={setModelOpen}
                              fileData={val}
                            />
                          </a>
                        ) : (
                          <DocumentIcon
                            setModelFile={setModelFile}
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
              })
            ) : (
              <Typography variant="body1" style={{ margin: "10px" }}>
                No documents currently
              </Typography>
            )}
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
            <b>{modelFile?.documentTitle}</b>
          </Typography>

          <Typography
            variant="body1"
            style={{ marginBottom: "10px", justifyContent: "left" }}
          >
            <iframe
              src={modelFile?.documentUrl}
              width="500px"
              height="500px"
              title="Document Viewer"
            />
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
