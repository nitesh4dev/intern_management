import React, { useState, useContext, Fragment } from "react";
import clsx from "clsx";
import resoluteaiLogo from "../assets/images/resoluteai-logo.png";
import { Link, useHistory, useParams } from "react-router-dom";
import { db } from "../firebase/Firebase";
import {
  PersonAddTwoTone,
  Settings,
  Menu,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  SettingsApplications,
} from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import TimelineIcon from "@material-ui/icons/Timeline";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import SettingsIcon from "@material-ui/icons/Settings";
import BookIcon from "@material-ui/icons/Book";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { Home } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  Drawer,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  makeStyles,
  useTheme,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Dialog,
  DialogContent,
  Grid,
  Button,
} from "@material-ui/core";
import ClientProfile from "./subheader/ClientProfile";
import Notifications from "./subheader/Notifications";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ImageIcon from "@material-ui/icons/Image";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  modalContainer: {
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "30px",
  },
}));

const StyledListItem = withStyles({
  root: {
    height: 48,
    marginTop: "10px",
    "&.Mui-selected": {
      backgroundColor: "#FFE8E9",
      color: "black",
      borderLeft: "3px solid #f44336",
      fontWeight: "bolder",
    },
  },
})(ListItem);

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header() {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const { title, setTitle } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const management = localStorage.getItem("management");
  //Initial component state
  const [open, setOpen] = React.useState(true);

  //Modal state
  const [modelOpen, setModelOpen] = useState(false);
  const modalClose = () => {
    setModelOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItem = [
    {
      text: "Home",
      icon: <Home color={title === "Home" ? "primary" : "default"} />,
      onClick: () => {
        setTitle("Home");
        history.push("/");
      },
    },
    {
      text: "Javascript Openings",
      icon: (
        <BookIcon
          color={title === "Javascript Openings" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Javascript Openings");
        history.push("/javascript");
      },
    },

    {
      text: "Python Openings",
      icon: (
        <ConfirmationNumberIcon
          color={title === "Python Openings" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Python Openings");
        history.push("/python");
      },
    },

    // {
    //   text: "Settings",
    //   icon: (
    //     <SettingsIcon color={title === "Settings" ? "primary" : "default"} />
    //   ),
    //   onClick: () => {
    //     setTitle("Settings");
    //     history.push("/settings");
    //   },
    // },
  ];

  const loggedInListItem = [
    {
      text: "Home",
      icon: <Home color={title === "Home" ? "primary" : "default"} />,
      onClick: () => {
        setTitle("Home");
        history.push("/loggedin/home");
      },
    },
    {
      text: "My Profile",
      icon: (
        <PersonIcon color={title === "My Profile" ? "primary" : "default"} />
      ),
      onClick: () => {
        setTitle("My Profile");
        history.push("/loggedin/myprofile");
      },
    },
    {
      text: "Openings",
      icon: <BookIcon color={title === "Openings" ? "primary" : "default"} />,
      onClick: () => {
        setTitle("Openings");
        history.push("/loggedin/openings");
      },
    },

    {
      text: "Your Applications",
      icon: (
        <ConfirmationNumberIcon
          color={title === "Your Applications" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Your Applications");
        history.push("/loggedin/applications");
      },
    },
    {
      text: "Your Assignments",
      icon: (
        <AssignmentIcon
          color={title === "Your Assignments" ? "primary" : "default"}
        />
      ),
      onClick: () => {
        setTitle("Your Assignments");
        history.push("/loggedin/assignments");
      },
    },
    {
      text: "Gallery",
      icon: <ImageIcon color={title === "Gallery" ? "primary" : "default"} />,
      onClick: () => {
        setTitle("Gallery");
        history.push("/loggedin/gallery");
      },
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          {user !== null ? (
            <Typography variant="h3" style={{ flexGrow: "1" }}>
              Welcome {user.userData.GeneralDetails.internName}
            </Typography>
          ) : (
            <Typography variant="h3" style={{ flexGrow: "1" }}></Typography>
          )}
          {user !== null ? (
            <Fragment>
              <Notifications />
              <ClientProfile />{" "}
            </Fragment>
          ) : (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Typography variant="body1" color="primary">
                Login
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div
            className={classes.logoHolder}
            onClick={() => {
              history.push("/");
              setTitle("Home");
            }}
          >
            <img src={resoluteaiLogo} alt="Resolute AI" width="100%" />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {user !== null
            ? loggedInListItem.map(({ text, icon, onClick, index }) => {
                return (
                  <StyledListItem
                    button
                    key={index}
                    onClick={onClick}
                    selected={title === text}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </StyledListItem>
                );
              })
            : listItem.map(({ text, icon, onClick, index }) => {
                return (
                  <StyledListItem
                    button
                    key={index}
                    onClick={onClick}
                    selected={title === text}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </StyledListItem>
                );
              })}
        </List>
      </Drawer>
    </div>
  );
}
