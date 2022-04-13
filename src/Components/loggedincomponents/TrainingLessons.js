import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import LessonTable from "./LessonTable";

const TrainingLessons = () => {
  const { type } = useParams();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12} md={12}>
          <LessonTable type={type} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingLessons;
