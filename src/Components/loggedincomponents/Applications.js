import React, { Fragment, useEffect, useState, useContext } from "react";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import { AuthContext } from "../../Context/AuthContext";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { DataContext } from "../../Context/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHead: {
    backgroundColor: "#EFEFEF",
  },
  card: {
    padding: theme.spacing(3, 4),
  },
  actionIcons: {
    paddingTop: "5px",
  },
}));

const headings = [
  "Role",
  "Domain",
  "Applied On",
  "Application Status",
  "View Assignment",
];
export default function Applications() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { setTitle } = useContext(DataContext);
  const [applications, setApplications] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    db.collection(`InternsProfile/${user.userDocId}/AppliedTo`)
      .where("OpeningStatus", "==", "applied")
      .onSnapshot((snapshot) => {
        const applied = snapshot.docs.map((doc) => doc.data());
        setApplications(applied);
      });
  }, []);
  console.log(applications);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  return (
    <Fragment>
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        {" "}
        My Applications{" "}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {headings.map((heading) => (
                <TableCell align="center">
                  <b> {heading}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0
              ? applications &&
                applications.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {row.OpeningDetails.Title}
                        <span>
                          <Tooltip title="View Opening">
                            <Link
                              to={"/loggedin/openings"}
                              onClick={() => {
                                setTitle("Openings");
                              }}
                            >
                              <OpenInNewIcon
                                color="primary"
                                fontSize="small"
                                className={classes.actionIcons}
                              />
                            </Link>
                          </Tooltip>
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {row.OpeningDetails.Domain}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.OpeningDetails.AppliedOn.seconds * 1000)
                          .toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/ /g, "-")}
                      </TableCell>
                      <TableCell align="center">{row.OpeningStatus}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Assignment">
                          <Link
                            to={"/loggedin/assignments"}
                            className={classes.actionIcons}
                            onClick={() => {
                              setTitle("Your Assignments");
                            }}
                          >
                            <OpenInNewIcon color="primary" fontSize="small" />
                          </Link>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              : filteredData.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {row.OpeningDetails.Title}
                      </TableCell>
                      <TableCell align="center">
                        {row.OpeningDetails.Domain}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.OpeningDetails.AppliedOn.seconds * 1000)
                          .toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/ /g, "-")}
                      </TableCell>
                      <TableCell align="center">{row.OpeningStatus}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Assignment">
                          <Link
                            to={"/loggedin/assignments"}
                            className={classes.actionIcons}
                            // onClick={() => {
                            //   setTitle("Tickets");
                            // }}
                          >
                            <OpenInNewIcon color="primary" fontSize="small" />
                          </Link>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={20}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
