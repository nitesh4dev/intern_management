import React from 'react';
import { Avatar, makeStyles, Badge, withStyles } from '@material-ui/core';
import MaskIcon from '../assets/icons/mask_icon.png'

const useStyles = makeStyles((theme) => ({
    medium: {
        height: '70px',
        width: "70px",
        margin: '0 auto'
    },
    badgeBorder: {
        background: "#ff4081",
        color: "white",
        animation: "at - ripple - pink 0.6s linear infinite"
    }
}))

const StyledBadge = withStyles((theme) => ({
    badge: {
        height: 50,
        color: '#44b700',
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '5px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(0)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(1.5)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 50,
        height: 50,
    },
}))(Avatar);

function ProfileImage({ url, mask, maskStatus }) {
    const classes = useStyles();
    return (
        mask && maskStatus ? (
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={<SmallAvatar src={MaskIcon} />}
            >
                <Avatar className={classes.medium} src={url} />
            </StyledBadge>
        ) : (<Avatar src={url} className={classes.medium} />)
    )
}

export default ProfileImage
