import React, { useRef, useState } from 'react';
import useAuth from '../Authentication'
import { useHistory } from "react-router-dom"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Copyright from '../DataProcess/copyright';


const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const [agree, setAgree] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailUsed, setEmailUsed] = useState(true)
  const [pswMatch, setPswMatch] = useState(true)
  const [pswdok, setPswok] = useState(true)

  const { SignUp, currentUser } = useAuth();
  const history = useHistory()
  const classes = useStyles();


  function isPassOK() {
    if (passwordRef.current.value && passwordRef.current.value.length >= 6) {
      setPswok(true);
    } else {
      setPswok(false)
    }
  }
  function isPassMatch() {
    if (passwordRef.current.value === passwordConfRef.current.value) {
      setPswMatch(true)
    } else { setPswMatch(false) }
  }


  async function HandleOnSubmit(e) {
    e.preventDefault();

    if (!passwordRef.current.value && !passwordConfRef.current.value || !emailRef.current.value) {
      return setError("Enter your Email and Password first")
    } else {
      setError("")
    }

    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError("Password not matching")
    }

    if (!agree) {
      setPswok(true);
      return setError("Please Accept the Terms and conditions first")
    }
    try {
      setError("")
      setLoading(true)
      await SignUp(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      history.push("/finishregistration")
      return 
    } catch (e) {
      if (e.code == "auth/email-already-in-use") {
        setError("Email already Registered, Try to Login?")
        setEmailUsed(false);
        setLoading(false);
      }
      return
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={7} md={7} className={classes.image} />
      <Grid item xs={12} sm={5} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Register</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form className={classes.form} onSubmit={HandleOnSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    required
                    label="Email Address"
                    inputRef={emailRef}
                    name="email"
                    onChange={() => setLoading(false)}
                    autoComplete="email"
                    error={!emailUsed}
                    helperText={!emailUsed ? "Email already registered" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={isPassOK}
                    inputRef={passwordRef}
                    type="password"
                    id="password"
                    error={!pswdok}
                    helperText={!pswdok ? "Password length is too short" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="confirm password"
                    inputRef={passwordConfRef}
                    type="password"
                    onChange={isPassMatch}
                    id="passwordconf"
                    error={!pswMatch}
                    helperText={!pswMatch ? "Password doesnt match, please confirm your password" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox key={true} onChange={() => { setAgree(!agree) }} color="primary" />}
                    label="I agree to follow rules and regulations by club, and i'm ok to be facing immediate consequences by club"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                onClick={HandleOnSubmit}
                variant="contained"
                color="primary"
                className={classes.submit}>{loading ? "Please Wait" : "Register"}</Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}