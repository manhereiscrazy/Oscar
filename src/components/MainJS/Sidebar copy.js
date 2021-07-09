import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import useAuth from '../authentication/Authentication';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Link, IconButton, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MuiAlert from '@material-ui/lab/Alert';
import { Firestore } from '../authentication/firebase';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  mainFeaturedansmntContentTitle: {
    fontWeight: "bold",
    "&:hover": {
      color: "red",
      transition: "1s ease-out",
    },
  },
  ExpandText: {
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      color: "red",
      fontWeight: "bold",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
  },
  ExpandEDText: {
    color: "black",
    // fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      fontWeight: "normal",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
  },
  priority0: {
    color: "black",
    fontWeight: "bolder",
    textDecoration: "none",
  },
  priority1: {
    color: "red",
    fontWeight: "bolder",
    textDecoration: "none",
  },
  priority2: {
    color: "green",
    fontWeight: "bolder",
    textDecoration: "none",
  },
  priority3: {
    color: "blue",
    fontWeight: "bolder",
    textDecoration: "none",
  },
  snackBar: {
    width: 'auto',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Sidebar({ annsmnts, setRead, read, social, setAlerts, alerts }) {
  const { SignOut, currentUser, authUser, serverTime } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(true)
  const [notifi, setNotifi] = useState([]);


  const handleClose = () => {
    setOpen(false);
  };


  async function HandleViewed(instance) {
    console.log("Clicked")
    try {
      const viewers_ = instance.viewers;
      if (!viewers_.includes(currentUser.uid)) {
        viewers_.push(currentUser.uid);
        await Firestore.announcements.doc(instance.id).set({ ...instance, viewers: viewers_ }, { merge: true });
        setRead(!read)
        setOpen(false);
      } else {
        setOpen(false);
      }
    } catch (e) {
      console.log("###DBG3", e.code, instance.id)
      return
    }
  }
  return (
    <>
      <Grid container item xs={12}>
        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Announcements
        </Typography>
        {annsmnts && 
        !annsmnts.length == 0 ?
          annsmnts.map((ansmnt, index) =>
          <>
              <Grid key={index} container direction="row" spacing={4} justify="flex-start">
                <Grid item>
                  <Paper style={{ width: "100%" }} elevation={13} className={classes.sidebarAboutBox}>
                    <Grid container justify="space-between" className={classes.root} spacing={2}>
                      <Grid justify="center" alignContent="strech" item>
                        <Typography className=
                          {
                            ansmnt.priority && ansmnt.priority == 1 ? classes.priority1 : ansmnt.priority == 2 ? classes.priority2 : ansmnt.priority == 3 ? classes.priority3 : classes.priority0
                          }
                          component="h2" variant="subtitle1" style={{ textTransform: 'capitalize' }}>
                          {ansmnt.title}
                        </Typography>
                      </Grid>
                      <Grid justify="center" alignContent="right" item>
                        <IconButton color="secondary" title="Mark as read">
                          <DoneAllIcon onClick={() => HandleViewed(ansmnt)} />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Typography style={{ fontSize: "10px" }} variant="subtitle2" color="textSecondary" gutterBottom paragraph>
                      {ansmnt.author && ansmnt.author} @ {ansmnt.createdAt && ansmnt.createdAt.toDate().toString().split('GMT')[0]}
                    </Typography>
                    <Typography paragraph variant="subtitle2">{ansmnt.content}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </>
          ) :
          <Grid container direction="row" spacing={4} justify="flex-start">
            <Grid item>
              <Paper elevation={13} className={classes.sidebarAboutBox}>
                <Typography variant="subtitle1" gutterBottom>
                  No Announcements for you
                  </Typography>
              </Paper>
            </Grid>
          </Grid>
        }
      </Grid>
      {annsmnts[0] && annsmnts[0] ?
        <Paper elevation={24} className={classes.sidebarAboutBox}>
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle variant="h2" id="alert-dialog-title" onClose={handleClose} style={{ textDecoration: "underlined" }}>
              {annsmnts[0].title}
            </DialogTitle>
            <DialogContent>
              <Typography style={{ fontSize: "13px" }} variant="subtitle2" color="textSecondary">
                {annsmnts[0].author && annsmnts[0].author} @ {annsmnts[0].createdAt && annsmnts[0].createdAt.toDate().toString().split('GMT')[0]}
              </Typography>
              <Typography paragraph className=
                {
                  annsmnts[0].priority && annsmnts[0].priority == 1 ? classes.priority1 : annsmnts[0].priority == 2 ? classes.priority2 : annsmnts[0].priority == 3 ? classes.priority3 : classes.priority0
                } variant="h6">{annsmnts[0].content}
              </Typography>
            </DialogContent>
            <DialogActions>
              <ButtonGroup spacing={3} aria-label="outlined primary button group">
                <Button variant="outlined" color="secondary" onClick={handleClose}>CLOSE</Button>
                {/* <Button variant="outlined" color="secondary" onClick={()=>HandleViewed(annsmnts[0])}>
                    Mark as read</Button> */}
              </ButtonGroup>
            </DialogActions>
          </Dialog>
        </Paper>
        :
        ''}
    </>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};

