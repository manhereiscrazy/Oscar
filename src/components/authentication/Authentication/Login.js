import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../Authentication';
import { useHistory } from 'react-router-dom';

import Copyright from '../DataProcess/copyright';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        overflow:"hidden",

    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/1368x768)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formbg: {
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    console.log("DEBUG PROCESS")
    const phoneRef = useRef();
    const mailRef = useRef();
    const pswRef = useRef();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [mailOk, setMailOk] = useState(false)
    const [pswOk, setPswOk] = useState(false)

    const [toastopen, setToastopen] = useState(false);

    const handleToastClose = () => {
        setToastopen(false);
    };


    const { Login, currentUser } = useAuth();



    async function HandleOnSubmit(e) {
        e.preventDefault()
        if (!mailRef.current.value || !pswRef.current.value) {
            setToastopen(true)
            if (!mailRef.current.value) {
                setMailOk(true)
            }
            if (!pswRef.current.value) {
                setPswOk(true)
            }
            setError("Please Enter your Email and Password to login")
            return

        }
        setLoading(true)
        try {
            setError("")
            await Login(mailRef.current.value, pswRef.current.value)
            setLoading(false)
            history.push("/");
        } catch (e) {
            setToastopen(true);
            setError(e.code=="auth/network-request-failed"?"It appears to be something wrong with your internet connnection, Please Check your internet connection and try again" : e.code=="auth/user-not-found" ? "Email is not Registered, Would you like to Register now?":e.code=="auth/wrong-password"?"Wrong Email/Password combination, Need Help?":e.code)
            setLoading(false)
        }
        // history.push("/");
    }
    const classes = useStyles();
    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={7} md={8} className={classes.image} />
                <Grid item xs={12} sm={5} md={4} component={Paper} elevation={24} square className={classes.formbg}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>

                        <Snackbar TransitionComponent={Slide} open={toastopen} autoHideDuration={6000} onClose={handleToastClose}>
                            <Alert severity="error" onClose={handleToastClose}>{error}</Alert>
                        </Snackbar>
                        <form className={classes.form} onSubmit={HandleOnSubmit}>
                            {error && <Alert severity="error">{error}</Alert>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="email"
                                fullWidth
                                id="mail"
                                color="secondary" 
                                label="Email"
                                error={mailOk}
                                onFocus={() => setMailOk(false)}
                                name="email"
                                inputRef={mailRef}
                                autoComplete="email"
                                placeholder="example@server.com"
                                autoFocus
                                helperText={mailOk ? "Please Enter your Email" : ""}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                color="secondary" 
                                id="password"
                                placeholder="Enter password"
                                inputRef={pswRef}
                                error={pswOk}
                                onFocus={() => setPswOk(false)}
                                helperText={pswOk ? "Please Enter your Password" : ""}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained" color="secondary" 
                                disabled={loading}
                                className={classes.submit}>{loading?"Please wait":"Login"}</Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" color="secondary" variant="body2">
                                        Need Help?</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" color="secondary" variant="body2">Don't have an account?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                            </Box>
                        </form>
                    </div>
                <Copyright/>
                </Grid>
            </Grid>
        </div>
    )
}

