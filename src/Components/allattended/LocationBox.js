import React from 'react'
import {
    Grid,
    Card,
    ButtonBase,
    Typography,
    makeStyles
} from '@material-ui/core';
import {
    Room
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        justifyContent: 'space-evenly',
        padding: theme.spacing(2, 2),
        backgroundColor: '#EFEFEF'
    },
    cardHover: {
        transition: "0.3s",
        "&:hover": {
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        }
    },
}))

export default function LocationBox({ setLocation, locationWiseData, totalDetectedCount }) {
    const classes = useStyles();

    return (
        <Grid container spacing={4}>
            <Grid item lg={3} md={3} xs={6}>
                <Card className={classes.cardHover} elevation={3}>
                    <ButtonBase className={classes.card} onClick={() => setLocation('All Locations')}>
                        <Room fontSize="large" color="primary" />
                        <div>
                            <Typography variant="subtitle2" className="mB5"><b>{totalDetectedCount}</b></Typography>
                            <Typography  >All Locations</Typography>
                        </div>
                    </ButtonBase>
                </Card>
            </Grid>
            {
                locationWiseData.map((item) => (
                    <Grid item lg={3} md={3} xs={6}>
                        <Card className={classes.cardHover} elevation={3}>
                            <ButtonBase className={classes.card} onClick={() => setLocation(item.location)}>
                                <Room fontSize="large" color="primary" />
                                <div>
                                    <Typography variant="subtitle2" className="mB5"><b>{item.empArray.length}</b></Typography>
                                    <Typography  >{item.location}</Typography>
                                </div>
                            </ButtonBase>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
