import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDocumentsWithWhere } from "../FirebaseFunctions/firebaseFunctions";
import { timeStampToDateString } from "../UtilityFunctions/utilityFunctions";
/* 
    Note for devs: This Component renders for path '/:openingType' where openingType can be
    javascript, python and any other can be added and it will render those
    job openings 
*/

const useStyles = makeStyles((theme) => ({
  boxStyles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
const AllOpenings = () => {
  const classes = useStyles();
  //url parameter containing job type
  const { openingType } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [openingList, setOpeningList] = useState();
  //Get Jobs based on opening Type
  useEffect(() => {
    setIsLoading(true);
    getAllDocumentsWithWhere(`Internships`, `Domain`, openingType).then(
      (data) => {
        setOpeningList(data);
        setIsLoading(false);
      }
    );
  }, [openingType]);
  return (
    <Container>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {`${openingType.toUpperCase()} Openings`}
      </Typography>

      <Grid container spacing={3}>
        {!isLoading &&
          openingList?.map((opening, index) => (
            <Grid item lg={12} md={12} xs={12} key={index}>
              <Card elevation={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <CardHeader
                    titleTypographyProps={{ variant: "h4" }}
                    title={opening.Title}
                  />
                </Box>
                <Divider />

                <CardContent>
                  <Box
                    className={classes.boxStyles}
                    style={{ marginBottom: "20px" }}
                  >
                    <Typography variant="body1">
                      <b>Number of Openings: </b> {opening.NumberOfOpenings}
                    </Typography>
                    <Typography variant="body1">
                      <b>Internship Duration:</b> {opening.Duration}
                    </Typography>
                    <Typography variant="body1">
                      <b>Apply by:</b> {timeStampToDateString(opening.ApplyBy)}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    <b>Internship Title:</b> {opening.Title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: "20px" }}>
                    <b>Internship Domain:</b> {opening.Domain}
                  </Typography>
                  <Typography variant="body1">
                    <b>Internship Description: </b>
                    {opening.Description}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ justifyContent: "right", marginRight: "5px" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // onClick={() => applyFunc(index)}
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Snackbar for loading when the data loads */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Loading"
        open={isLoading}
        autoHideDuration={6000}
      />
    </Container>
  );
};

export default AllOpenings;
