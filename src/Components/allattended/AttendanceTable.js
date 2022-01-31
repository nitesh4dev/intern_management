import React, { useState, useEffect } from 'react';
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
    makeStyles,
} from '@material-ui/core';
import {
    MoreVert,
} from '@material-ui/icons'
import clsx from 'clsx';
import FilterIcon from '../../../assets/icons/filter.png';


import ProfileImage from '../../../common/ProfileImage';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSelect-root': {
            padding: theme.spacing(1, 4)
        },
    },
    card: {
        // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        padding: theme.spacing(3, 4)
    },
    cardHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tableHead: {
        backgroundColor: '#EFEFEF'
    }

}))

const headings = [
    'AVATAR',
    'NAME',
    'REPORTING-TO',
    'DEPARTMENT',
    'LOCATION',
    ''
]

export default function AttendanceTable({ location, locationWiseData, uniqueDepartment }) {
    const classes = useStyles();

    const [allPeopleDetected, setAllPeopleDetected] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [emptyTable, setEmptyTable] = useState(false);
    const [depSelected, setDepSelected] = useState("all");

    //Pagination task
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allPeopleDetected.length - page * rowsPerPage);

    //Filter functions
    const handleSelectChange = (e) => {
        setDepSelected(e.target.value);
        setEmptyTable(false);

        if (location === "All Locations") {
            if (e.target.value === "all") {
                setFilteredData([]);
            }
            else {
                const newData = allPeopleDetected.filter((item) => item.Department_details.department === e.target.value);
                newData.length > 0 ? setFilteredData(newData) : setEmptyTable(true);
            }
        }
        else {
            if (e.target.value === "all") {
                const newData = allPeopleDetected.filter((item) => item.location === location);
                newData.length > 0 ? setFilteredData(newData) : setEmptyTable(true);
            }
            else {
                const newData = allPeopleDetected.filter((item) => item.location === location);
                const data = newData.filter((item) => item.Department_details.department === e.target.value);
                data.length > 0 ? setFilteredData(data) : setEmptyTable(true);
            }
        }
    }

    useEffect(() => {
        const empArray = [];
        locationWiseData.forEach((data) => {
            data.empArray.forEach((emp) => {
                empArray.push(emp);
            })
        });

        setAllPeopleDetected(empArray);

    }, [locationWiseData]);

    useEffect(() => {
        setEmptyTable(false);
        if (location === "All Locations") {
            if (depSelected === "all") {
                setFilteredData([]);
            }
            else {
                const data = allPeopleDetected.filter((item) => item.Department_details.department === depSelected);
                data.length > 0 ? setFilteredData(data) : setEmptyTable(true);
            }
        }
        else {
            if (depSelected === "all") {
                const newData = allPeopleDetected.filter((item) => item.location === location);
                setFilteredData(newData)
            }
            else {
                const newData = allPeopleDetected.filter((item) => item.location === location);
                const data = newData.filter((item) => item.Department_details.department === depSelected);
                data.length > 0 ? setFilteredData(data) : setEmptyTable(true);
            }
        }
    }, [location, allPeopleDetected, depSelected])

    console.log("location", location)

    return (
        <Paper className={classes.card} elevation={3}>
            <Box className={clsx(classes.cardHeading, 'mB30')}>
                <Typography variant="subtitle2">{location}</Typography>
                <Box className={classes.root} display="flex" alignItems="center" >
                    <img src={FilterIcon} width="5%" className="mR10" alt="Filter" />
                    <TextField
                        label="Department"
                        variant="outlined"
                        select
                        SelectProps={{
                            native: true,
                        }}
                        onChange={(e) => handleSelectChange(e)}
                    >
                        <option value="all">All</option>
                        {
                            uniqueDepartment.map((department, index) => {
                                return <option value={department} key={index}>{department}</option>
                            })
                        }
                    </TextField>
                </Box>
            </Box>
            <TableContainer component={Paper} >
                <Table >
                    <TableHead className={classes.tableHead}>
                        <TableRow >
                            {
                                headings.map((heading) => (
                                    <TableCell align="center">
                                        <b> {heading}</b>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            emptyTable ? <TableRow></TableRow> :
                                filteredData.length === 0
                                    ? (rowsPerPage > 0
                                        ? allPeopleDetected.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : allPeopleDetected
                                    ).map((row, index) => (

                                        row.alert === "Intruder" ?
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <ProfileImage />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.rdbId}
                                                </TableCell>
                                                <TableCell align="center">None</TableCell>
                                                <TableCell align="center">None</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow> :
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <ProfileImage url={row.Profile_image} mask={true} maskStatus={row.maskStatus} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.Name.first_name + " " + row.Name.middle_name + " " + row.Name.last_name}
                                                    <Typography style={{ fontSize: '12px', color: "#828282" }} className="mT5">
                                                        {row.Designation}
                                                        <span style={{ color: "#026CB9" }} className="mL5">
                                                            (  {row.Employee_num})
                                           </span>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">{row.Department_details.reporting_to}</TableCell>
                                                <TableCell align="center">{row.Department_details.department}</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>
                                                <TableCell align="center"><MoreVert /></TableCell>
                                            </TableRow >
                                    ))
                                    : (rowsPerPage > 0
                                        ? filteredData.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : filteredData
                                    ).map((row, index) => (
                                        row.alert === "Intruder" ?
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <ProfileImage />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.rdbId}
                                                </TableCell>
                                                <TableCell align="center">None</TableCell>
                                                <TableCell align="center">None</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow> :
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <ProfileImage url={row.Profile_image} mask={true} maskStatus={row.maskStatus} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.Name.first_name + " " + row.Name.middle_name + " " + row.Name.last_name}
                                                    <Typography style={{ fontSize: '12px', color: "#828282" }} className="mT5">
                                                        {row.Designation}
                                                        <span style={{ color: "#026CB9" }} className="mL5">
                                                            (  {row.Employee_num})
                                       </span>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">{row.Department_details.reporting_to}</TableCell>
                                                <TableCell align="center">{row.Department_details.department}</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>
                                                <TableCell align="center"><MoreVert /></TableCell>
                                            </TableRow >
                                    ))
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={allPeopleDetected.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>

        </Paper>
    )
}

