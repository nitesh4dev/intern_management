import React, { useState, useEffect, useContext } from 'react'
import {
    Grid,
    Typography,
    Box,
    Container,
    Breadcrumbs
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    NavigateNext
} from '@material-ui/icons';
import { DataContext } from '../../../context/DataContext';

import LocationBox from './LocationBox';
import AttendanceTable from './AttendanceTable';


export default function AllAttended() {

    //context part
    const {
        uniqueLocation,
        todaysAllDetectedList,
        uniqueDepartment,
    } = useContext(DataContext);

    const [location, setLocation] = useState('All Locations');
    const [locationWiseData, setLocationWiseData] = useState([]);
    const [totalDetectedCount, setTotalDetectedCount] = useState(0);

    useEffect(() => {
        const empCountArray = [];
        let totalEmp = 0;
        todaysAllDetectedList.forEach((person) => {
            const rdbId = person.rdbId;
            const unKnownText = rdbId.split("_");
            if (unKnownText[0] !== "unknown") {
                totalEmp++;
            }
        });
        uniqueLocation.forEach((location) => {
            let empArray = []
            todaysAllDetectedList.reverse().forEach((person) => {
                const rdbId = person.rdbId;
                const unKnownText = rdbId.split("_");
                if (unKnownText[0] !== "unknown") {
                    if (location === person.location) {
                        empArray.push(person)
                    }
                }
            });
            empCountArray.push({ location, empArray })
        })
        setLocationWiseData(empCountArray);
        setTotalDetectedCount(totalEmp)
    }, [todaysAllDetectedList, uniqueLocation]);

    return (
        <Container>
            <Grid container>
                <Grid item lg={12} xs={12} className="mB20">
                    <Breadcrumbs separator={<NavigateNext color="primary" />} aria-label="breadcrumb">
                        <Link to="/ams/dashboard" style={{ color: "#707070" }}>
                            Dashboard
                        </Link>
                        <Link style={{ color: "#000" }} >
                            Attendance Logs
                         </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item lg={12} xs={12}>
                    <Typography variant="h1" className="mB30" >Attendance Logs</Typography>
                    <Box className="mB30">
                        <LocationBox
                            setLocation={setLocation}
                            locationWiseData={locationWiseData}
                            totalDetectedCount={totalDetectedCount}
                        />
                    </Box>
                    <Box>
                        <AttendanceTable
                            location={location}
                            locationWiseData={locationWiseData}
                            uniqueDepartment={uniqueDepartment}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
