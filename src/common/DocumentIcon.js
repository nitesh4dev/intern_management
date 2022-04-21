import React from "react";
import { Badge, IconButton, makeStyles, Typography } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { Check, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  badgeStylesAgreed: {
    "& .MuiBadge-colorPrimary": {
      backgroundColor: theme.palette.success.main,
    },
  },
  badgeStylesDeclined: {
    "& .MuiBadge-colorPrimary": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
const DocumentIcon = (props) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        onClick={() => {
          props.setModelFile(props.fileData);
          props.setIndex(props.index);
          if (!props.fileData.agreed) props.setModelOpen(true);
        }}
      >
        <Badge
          badgeContent={
            props.fileData.agreed ? (
              <Check style={{ fontSize: "10px" }} />
            ) : (
              <Close style={{ fontSize: "10px" }} />
            )
          }
          color="primary"
          className={
            props.fileData.agreed
              ? classes.badgeStylesAgreed
              : classes.badgeStylesDeclined
          }
        >
          <InsertDriveFileIcon style={{ fontSize: "50px" }} />
        </Badge>
      </IconButton>
      <Typography>{props.fileData.documentTitle}</Typography>
    </>
  );
};

export default DocumentIcon;
