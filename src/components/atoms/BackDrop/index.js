import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const classes = makeStyles(theme => ({
    backdrop: {
        zIndex: 999,
        opacity: '0.3 !important',
        color: '#fff',
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
}))

const BackDrop = ({ ...rest }) => (
    <Backdrop
        className={classes.backdrop}
        {...rest}
    >
        <CircularProgress />
    </Backdrop>
)

export default BackDrop