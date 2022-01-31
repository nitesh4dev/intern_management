import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  Badge,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import { DataContext } from "../../context/DataContext";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  noti_header: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
  noti_box: {
    position: "relative",
    width: "25vw",
    height: "100vh",
  },
  limited_noti: {
    maxHeight: "100vh",
    overflow: "hidden",
  },
  noti_list: {},
  noti_viewMore: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    "& button": {
      backgroundColor: "#828282",
      color: "#ffffff",
      borderRadius: "0px",
      padding: theme.spacing(2, 0),
      "&:hover": {
        backgroundColor: "#828282",
        color: "#ffffff",
      },
    },
  },
  hide_viewMore: {
    display: "none",
  },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [showNotification, setShowNotification] = useState(false);
  const [showAllNotification, setShowAllNotification] = useState(false);
  const [allNotiList, setAllNotiList] = useState([]);
  const history = useHistory();

  //context part
  // const { todaysAllDetectedList } = useContext(DataContext);

  const [allViolationLogs, setAllViolationLogs] = useState([]);
  const [totalAlertCount, setTotalAlertCount] = useState(0);
  const [noMaskCount, setNoMaskCount] = useState(0);
  const [overtimeCount, setOvertimeCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [lateAttendanceCount, setLateAttendanceCount] = useState(0);
  const [intruderCount, setInTruderCount] = useState(0);

  // console.log("totalAlertCount", totalAlertCount);

  //   useEffect(() => {
  //     let unknownCount = 0;
  //     let maskCount = 0;
  //     let blocked = 0;
  //     let overtime = 0;
  //     let lateAttentees = 0;
  //     const notiList = [];

  // todaysAllDetectedList.forEach((emp) => {
  //     const rdbTime = emp.rdbTime;
  //     const momentObj = moment(rdbTime, "HH-mm-ss-ssssss");
  //     const formattedDate = momentObj.format('h:mm a')

  //     emp.alert.forEach((type) => {
  //         if (type === "Intruder") {
  //             unknownCount++;
  //             notiList.push({ ...emp, type, "rdbTime": formattedDate })
  //         }
  //         if (type === "No Mask") {
  //             maskCount++;
  //             notiList.push({ ...emp, type, "rdbTime": formattedDate })
  //         }
  //         if (type === "Late Attendance") {
  //             lateAttentees++;
  //             notiList.push({ ...emp, type, "rdbTime": formattedDate })
  //         }
  //         if (type === "Blocked") {
  //             blocked++;
  //             notiList.push({ ...emp, type, "rdbTime": formattedDate })
  //         }
  //         if (type === "Overtime") {
  //             overtime++;
  //             notiList.push({ ...emp, type, "rdbTime": formattedDate })
  //         }
  //     })
  // });
  //     setAllNotiList(notiList);
  //     setInTruderCount(unknownCount);
  //     setNoMaskCount(maskCount);
  //     setBlockedCount(blocked);
  //     setOvertimeCount(overtime);
  //     setLateAttendanceCount(lateAttentees);
  //   }, [todaysAllDetectedList]);

  //calculate total alert count
  useEffect(() => {
    setTotalAlertCount(
      noMaskCount +
        intruderCount +
        lateAttendanceCount +
        blockedCount +
        overtimeCount
    );
  }, [
    noMaskCount,
    intruderCount,
    lateAttendanceCount,
    blockedCount,
    overtimeCount,
  ]);

  //   useEffect(() => {
  //     const peopleArray = [];

  // todaysAllDetectedList.forEach((person) => {
  //     if (person.alert.length > 0) {
  //         const rdbId = person.rdbId;
  //         const unKnownText = rdbId.split("_");
  //         if (unKnownText[0] === "unknown") {
  //             const data = { ...person, type: "Intruder" }
  //             peopleArray.push(data);
  //         }
  //         else {
  //             peopleArray.push(person)
  //         }
  //     }
  // });
  //     setAllViolationLogs(peopleArray.reverse());
  //   }, [todaysAllDetectedList]);

  const handleViewMore = () => {
    setShowAllNotification(true);
  };
  const handleNotiClick = () => {
    history.push("/ams/dashboard/alerts");
    setShowNotification(false);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setShowNotification(!showNotification);
          setTotalAlertCount(0);
        }}
      >
        <Badge badgeContent={totalAlertCount} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <div
          className={clsx(
            classes.noti_box,
            showAllNotification ? null : classes.limited_noti
          )}
        >
          <Box className={classes.noti_header}>
            <Typography className="colorWhite" variant="subtitle2">
              Notifications
            </Typography>
            <IconButton onClick={() => setShowNotification(false)}>
              <ArrowForwardIcon className="colorWhite" />
            </IconButton>
          </Box>
          <div className={classes.noti_list}>
            <List component="nav">
              {allNotiList.length > 0 ? (
                allNotiList.map((item, index) => {
                  return (
                    <ListItem button key={index} onClick={handleNotiClick}>
                      <ListItemIcon color="primary">
                        <NotificationsIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.type + " " + "Alert"}
                        secondary={`at ${item.location} on ${item.rdbTime}`}
                      />
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText primary="No Notifications!" />
                </ListItem>
              )}
            </List>
          </div>
          <Box
            className={clsx(
              classes.noti_viewMore,
              showAllNotification ? classes.hide_viewMore : null
            )}
          >
            <Button fullWidth onClick={handleViewMore}>
              View All Notifications
            </Button>
          </Box>
        </div>
      </Drawer>
    </>
  );
}
