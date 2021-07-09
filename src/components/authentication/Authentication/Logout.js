import React, { useState } from 'react';
import { IconButton, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl } from '@material-ui/core';
import { Route, Redirect, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import useAuth from '../Authentication'
import Copyright from '../DataProcess/copyright';


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
        "&:hover": {
            color: "red"
        },
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

export default function Logout() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const history = useHistory()
    const [error, setError] = useState("")
    const { SignOut, currentUser } = useAuth();

    async function handleClickOpen() {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        SignOut()
        history.push("/login")
    };

    return (
        <div>
            <Dialog
                style={{
                    background: 'url(https://source.unsplash.com/random)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" onClose={handleClose} style={{ textDecoration: "underlined" }}>
                    Hey {currentUser && currentUser.email}, Wait a sec!
        </DialogTitle>
                <DialogContent>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <Typography className={classes.MainFePoTitle} variant="h6" gutterBottom>You have Sucessfully logged out, See you soon</Typography>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup gutterBottom spacing={3} aria-label="outlined primary button group">
                        <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </div>
    )
}
