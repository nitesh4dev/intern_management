import React, { useState, useContext } from "react";
import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Dialog,
  DialogContent,
  Grid,
  Button,
  Slide,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ExpandMore,
  ExpandLess,
  PersonOutline,
  Equalizer,
  Settings,
  HelpOutline,
  GroupOutlined,
} from "@material-ui/icons";
import clsx from "clsx";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

const useStyles = makeStyles((theme) => ({
  profileSection: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  block: {
    padding: theme.spacing(1),
  },
  avatarImg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  modalContainer: {
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "30px",
  },
}));

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClientProfile() {
  const classes = useStyles();
  let history = useHistory();
  const { logout } = useContext(AuthContext);
  const { setTitle } = useContext(DataContext);

  //context property from Authcontext
  // const { client: { Profile_image, Email, Username } } = useContext(AuthContext);

  //prfile part
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //Modal state
  const [modelOpen, setModelOpen] = useState(false);
  const modalClose = () => {
    setModelOpen(false);
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.profileSection} onClick={handleMenu}>
        <div className={classes.block}>
          <Avatar
            src={null}
            variant="circle"
            className={classes.avatarImg}
          ></Avatar>
        </div>
        <div className={classes.block}>
          <Typography></Typography>
        </div>
        <div className={classes.block}>
          {open ? (
            <ExpandLess color="primary" />
          ) : (
            <ExpandMore color="primary" />
          )}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/loggedin/myprofile");
            setTitle("My Profile");
          }}
        >
          <ListItemIcon>
            <PersonOutline />
          </ListItemIcon>
          <Typography>Profile</Typography>
        </MenuItem>
        {/* <MenuItem>
                    <ListItemIcon>
                        <Equalizer />
                    </ListItemIcon>
                    <Typography >Analytics</Typography>
                </MenuItem> */}
        {/* <Divider className={clsx("mT5", "mB5")} /> */}
        <MenuItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <Typography>Settings & Privacy</Typography>
        </MenuItem>

        <Divider className={clsx("mT5", "mB5")} />
        <MenuItem
          onClick={() => {
            setModelOpen(true);
          }}
        >
          <Typography style={{ width: "100%", textAlign: "center" }}>
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
      <Dialog
        open={modelOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={modalClose}
      >
        <DialogContent className={classes.modalContainer}>
          <Typography variant="subtitle1" className="mB10">
            <b>Confirm Logout</b>
          </Typography>
          <Typography align="center" style={{ marginBottom: "10px" }}>
            Are you sure you want to log out?
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={modalClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                  logout();
                  modalClose();
                  history.push("/");
                }}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
