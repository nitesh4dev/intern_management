import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function TrainingVidoes() {
  const { id } = useParams();
  const title = id.replace("-", " ");
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon color="primary" />}
        style={{ marginBottom: "20px" }}
      >
        <Link
          to="/loggedin/training"
          style={{ color: "#707070", textDecoration: "none" }}
        >
          Training
        </Link>
        <Link style={{ color: "#000", textDecoration: "none" }}> {title}</Link>
      </Breadcrumbs>
      <Typography variant="h2">
        No training modules have been assigned to you yet
      </Typography>
    </div>
  );
}

export default TrainingVidoes;
