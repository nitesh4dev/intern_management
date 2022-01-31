import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  withStyles,
  InputAdornment,
  Button,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
// import ProfileImage from "../../common/ProfileImage";
import { MoreVert, Search } from "@material-ui/icons";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `30px`,
      },
    },
  },
})(TextField);

const headings = [
  "Ticket Number",
  "Responsible Team",
  "Created on",
  "Closing Date",
  "Status",
  "View Ticket",
];
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
    // marginRight: "20px",
  },
}));

export default function DashboardTable() {
  const classes = useStyles();
  const [emptyTable, setEmptyTable] = useState(false);
  const { setTitle } = useContext(DataContext);

  const tableDetails = [
    {
      ticketNumber: "1",
      responsible: "Team A",
      createdon: "18 Dec",
      closingDate: "19Dec",
      status: "in process",
    },
    {
      ticketNumber: "2",
      responsible: "Team C",
      createdon: "18 Dec",
      closingDate: "19Dec",
      status: "over due",
    },
    {
      ticketNumber: "3",
      responsible: "Team D",
      createdon: "18 Dec",
      closingDate: "19Dec",
      status: "in process",
    },
    {
      ticketNumber: "4",
      responsible: "Team A",
      createdon: "18 Dec",
      closingDate: "19Dec",
      status: "over due",
    },
  ];

  //Pagination task
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, 13 - page * rowsPerPage);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center" colSpan={headings.length}>
                <b>LATEST ACTIVITY</b>
              </TableCell>
            </TableRow>
            <TableRow>
              {headings.map((heading) => (
                <TableCell align="center">
                  <b> {heading}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {emptyTable ? (
              <TableRow></TableRow>
            ) : (
              tableDetails.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{row.ticketNumber}</TableCell>
                    <TableCell align="center">{row.responsible}</TableCell>
                    <TableCell align="center">{row.createdon}</TableCell>
                    <TableCell align="center">{row.closingDate}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="check ticket details">
                        <Link
                          to={"/dashboard/tickets"}
                          className={classes.actionIcons}
                          onClick={() => {
                            setTitle("Tickets");
                          }}
                        >
                          <OpenInNewIcon color="primary" fontSize="small" />
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
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
    </div>
  );
}
