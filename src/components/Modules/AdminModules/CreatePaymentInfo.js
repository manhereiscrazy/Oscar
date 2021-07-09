import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../../authentication/Authentication';
import { useHistory } from "react-router-dom";
import Firebase, { Firestore } from '../../authentication/firebase';

import { Container, Grid, Checkbox, ListItemText, ListItemSecondaryAction, ListItemIcon, ListItem, List, TextField, Box, Typography, Switch, ListItemAvatar, Avatar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, Paper } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PaymentIcon from '@material-ui/icons/Payment';

import Copyright from '../../authentication/DataProcess/copyright';


const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


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
    formControl: {
        //   margin: theme.spacing(1),
        minWidth: "100%",
    },
}));

export default function CreateRentInfo() {
    const history = useHistory();
    const { SignUp, currentUser, authUser } = useAuth();
    // States
    const [loading, setLoading] = useState(false);
    const [typE, setTypE] = useState(false);
    const [paymentData, setPaymentData] = useState();
    const [error, setError] = useState("");
    const [month, setMonth] = useState("");
    // Refs
    const amtRef = useRef();
    const dateRef = useRef();
    const comtRef = useRef();
    const descRef = useRef();


    const classes = useStyles();

    function HandleDataSubmit(e) {
        try {
            setPaymentData({
                visible: true,
                p_type: typE,
                is_active: true,
                created_by: currentUser.uid,
                createdAt: Firestore.serverTime(),
                author: { name: authUser.fName + " " + authUser.lName, image: authUser.image.uri },
                amount: amtRef.current.value,
                date: dateRef.current.value,
                month: month ? month : null,
                description: descRef.current && descRef.current.value ? descRef.current.value : null,
                comment: comtRef.current && comtRef.current.value ? comtRef.current.value : null,
                payees: [],
            });
        }
        catch (e) {
            console.log("error", e.code);
        };
    }
    async function HandlePaymentOnSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await Firestore.payment_data.add(paymentData)
            setError("");
            setLoading(false);
            setPaymentData();
            history.push("/");
            return
        } catch (e) {
            setError(`Error occurd, Failed to create Payment notification, please try again later`);
            // console.log("ERROR", e.code)
            setLoading(false);
            return
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={0} sm={5} md={8} xl={8} className={classes.image} />
            <Grid item xs={12} sm={7} md={4} xl={4} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PaymentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">{typE ? "New Payment Notification" : "New Rent Notification"}</Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form className={classes.form} onSubmit={HandlePaymentOnSubmit}>
                            <Grid container spacing={2}>
                                {typE && <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentdescription"
                                        required
                                        name="rentdescription"
                                        variant="outlined"
                                        fullWidth
                                        inputRef={descRef}
                                        id="rentdescription"
                                        label="Description"
                                        color="secondary"
                                        helperText="Description Of payment"
                                        title="Enter the Description of the payment"
                                        autoFocus
                                        onChange={() => setError("")}
                                    />
                                </Grid>}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentamt"
                                        required
                                        name="rentamt"
                                        variant="outlined"
                                        fullWidth
                                        inputRef={amtRef}
                                        id="rentamt"
                                        label="Amount"
                                        color="secondary"
                                        helperText="Enter Payment Amount"
                                        type="number"
                                        title="Enter the rent amount which a member should pay"
                                        autoFocus
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onChange={() => setError("")}
                                    />
                                </Grid>
                                {typE && <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="rentcomment"
                                        name="rentcomment"
                                        variant="outlined"
                                        fullWidth
                                        inputRef={comtRef}
                                        id="rentcomment"
                                        label="Comments"
                                        title="Enter the comment about a rent which a member should pay"
                                        color="secondary"
                                        helperText="Comment(optional)"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onChange={() => setError("")}
                                        // helperText={!fieldOK ? "*required" : ""}
                                        autoFocus
                                    />
                                </Grid>}
                                {!typE && <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        value={month}
                                        onChange={(e)=>{setMonth(e.target.value)}}
                                        >
                                            {
                                                Months.map((month, i) =>
                                                    <MenuItem key={i} value={month}>
                                                        {month}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>}
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
                                <Grid item xs={12} sm={6} style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight="3.4rem">
                                        {typE ?
                                            <div style={{
                                                border: "1px solid #BFBFBF", color: "grey",
                                                fontSize: "10px", padding: "1px 5px"
                                            }}>
                                                Rent
                                            </div> : <div style={{
                                                border: "1px solid green", padding: "1px 5px",
                                                // backgroundColor:"white",
                                                fontSize: "10px",
                                                color: "green"
                                            }}>
                                                Rent Payment
                                                </div>}
                                        <Switch
                                            checked={typE}
                                            onChange={() => setTypE(!typE)}
                                            color="secondary"
                                            fullWidth
                                            name="checkedB"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />{typE ?
                                            <div style={{
                                                border: "1px solid green", padding: "1px 5px",
                                                // backgroundColor:"white",
                                                fontSize: "10px",
                                                color: "green"
                                            }}>
                                                Other Payment
                                                </div> :
                                            <div style={{
                                                border: "1px solid #BFBFBF", color: "grey",
                                                fontSize: "10px", padding: "1px 5px"
                                            }}>
                                                Other
                                                </div>}
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
                                {loading ? "Please Wait" : "Create Payment Notification"}
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

