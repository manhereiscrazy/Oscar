import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import { IconButton, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl } from '@material-ui/core';


import Firebase, { Firestore } from '../authentication/firebase';
import useAuth from '../authentication/Authentication';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    dialogbody: {
        color: "inherit",
    },
    dialogIMG: {
        backgroundImage: 'url(https://source.unsplash.com/random/1024x768/)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
}));


export default function PopUP({ open, setOpen, handleClose, popdata = null, action = null, type = null, btntext = null }) {
    const { SignOut, currentUser, authUser } = useAuth();
    const classes = useStyles();

    return (
        // <div style={{background:'url(https://source.unsplash.com/random/1024x768/)',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',}}>
        <React.Fragment>
            <CssBaseline />
            <Paper elevation={24} className={classes.sidebarAboutBox}>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" onClose={handleClose} style={{ textDecoration: "underlined" }}>{popdata.title}
                    </DialogTitle>
                    <DialogContent>
                        <Card className={classes.card}>
                            <CardActionArea className={classes.dialogbody}>
                                <Typography className={classes.MainFePoTitle} variant="subtitle1" gutterBottom>{popdata.content}</Typography>
                            </CardActionArea>
                        </Card>
                        <Typography style={{ fontWeight: "bold" }} className={classes.MainFePoTitle} variant="overline" gutterBottom><p></p>{popdata.wish}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <>{type ?
                            <ButtonGroup spacing={3} aria-label="outlined primary button group">
                                <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="outlined" color="primary" onClick={() => action}>{btntext}</Button>
                            </ButtonGroup>
                            :
                            <ButtonGroup spacing={3} aria-label="outlined primary button group">
                                <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                            </ButtonGroup>
                        }</>
                    </DialogActions>
                </Dialog></Paper>
        </React.Fragment>
        // </div>
    );
}


