import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../../authentication/Authentication';
import { useHistory } from "react-router-dom";
import Firebase, { Firestore } from '../../authentication/firebase';

import { Container, Grid, Checkbox, ListItemText, ListItemSecondaryAction, ListItemIcon, ListItem, List, TextField, Box, Typography, Switch, ListItemAvatar, Avatar } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, Paper } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';


import Copyright from '../../authentication/DataProcess/copyright';




const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "100vh"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreateRentInfo() {
    const history = useHistory();
    const { SignUp, currentUser, authUser } = useAuth();
    // States
    const [loading, setLoading] = useState(false);
    const [fieldOK, setFieldOK] = useState(true);
    const [publish, setPublish] = useState(true);
    const [rentData, setRentData] = useState();
    const [error, setError] = useState("");
    // Refs
    const amtRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    const comtRef = useRef()


    const classes = useStyles();

    function HandleDataSubmit(e) {
        // try {
        //     setFeedPostData({
        //         visible: publish,
        //         user_id: currentUser.uid,
        //         createdAt: Firestore.serverTime(),
        //         priority: priorityRef.current.value,
        //         viewers:[],
        //         title: titleRef.current.value,
        //         author: {name:authUser.fName + " " + authUser.lName,image:authUser.image.uri},
        //         image: 'https://source.unsplash.com/random',
        //         content: contentRef.current.value,
        //         date: dateRef.current.value ? dateRef.current.value : null,
        //         time: timeRef.current.value ? timeRef.current.value : null,
        //     });

        //     console.log("Debug=>", authUser.Email, authUser.fName, feedPostData)
        // }
        // catch (e) {
        //     setError("Enter the required fields" + e.code);
        //     console.log("error", e.code);
        //     // setFieldOK(false);
        // };
    }
    async function HandleOnSubmit(e) {
        e.preventDefault();
        // setError("");
        // try {
        //     setLoading(true);
        //     await Firestore.notifications.add(feedPostData)
        //     console.log("Debug=>", authUser.email, authUser.fName, feedPostData)
        //     setError("");
        //     setLoading(false);
        //     history.push("/")
        //     return
        // } catch (e) {
        //     setError("Error occurd, Your post is not created, please try later");
        //     console.log("ERROR", e.code)
        //     setError(e.code);
        //     setLoading(false);
        //     return
        // }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EmailOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">New Payment Notice</Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form className={classes.form} onSubmit={HandleOnSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentitle"
                                        required
                                        name="rentitle"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={nnameRef}
                                        id="rentitle"
                                        label="Payment Title"
                                        color="secondary"
                                        helperText="Enter Rent Amount"
                                        title="Enter the rent amount which a member should pay"
                                        autoFocus
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onChange={() => setFieldOK(true) || setError("")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentamt"
                                        required
                                        name="rentamt"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={nnameRef}
                                        id="rentamt"
                                        label="Amount"
                                        color="secondary"
                                        helperText="Enter Rent Amount"
                                        type="number"
                                        title="Enter the rent amount which a member should pay"
                                        autoFocus
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onChange={() => setFieldOK(true) || setError("")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentcomment"
                                        name="rentcomment"
                                        variant="outlined"
                                        fullWidth
                                        // inputRef={nnameRef}
                                        id="rentcomment"
                                        label="Comments"
                                        title="Enter the comment about a rent which a member should pay"
                                        color="secondary"
                                        helperText="Comment(optional)"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        // helperText={!fieldOK ? "*required" : ""}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="dob"
                                        color="secondary"
                                        inputRef={dateRef}
                                        helperText="Last Date*"
                                        title="Final Date which a member can pay rent without any consequences or fine"
                                        name="dob"
                                        type="date"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="dob"
                                        color="secondary"
                                        inputRef={timeRef}
                                        helperText="Time"
                                        name="dob"
                                        type="time"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}></Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight="3.4rem">
                                        <div style={publish ? { color: "green" } : { color: "red" }}>
                                            Inform Members
                                        </div>
                                        <Switch
                                            checked={publish}
                                            onChange={() => setPublish(!publish)}
                                            color="secondary"
                                            fullWidth
                                            name="checkedB"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Button
                                onClick={HandleDataSubmit}
                                type="submit"
                                fullWidth
                                disabled={loading || error}
                                variant="contained"
                                color="secondary"
                                className={classes.submit}>
                                {loading ? "Please Wait" : "Create Rent info"}
                            </Button>
                            <Grid container justify="flex-end">
                            </Grid>
                        </form>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
}

