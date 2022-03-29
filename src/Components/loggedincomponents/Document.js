import { Card, CardContent, Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import Agreement from "./Agreement";

const Document = () => {
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Agreement />
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Document;
