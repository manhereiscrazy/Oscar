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

export default function Notifications({ alerts, setAlerts }) {
  const { SignOut, currentUser, authUser, serverTime } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(true)
  const [notifi, setNotifi] = useState([]);


  const handleClose = () => {
    setOpen(false);
  };


  async function HandleViewed(instance) {
    console.log("Clicked")
    // try {
    //   const viewers_ = instance.viewers;
    //   if (!viewers_.includes(currentUser.uid)) {
    //     viewers_.push(currentUser.uid);
    //     await Firestore.notifications.doc(instance.id).set({ ...instance, viewers: viewers_ }, { merge: true });
    //     setOpen(false);
    //   } else {
    //     setOpen(false);
    //   }
    // } catch (e) {
    //   console.log("###DBG3", e.code, instance.id)
    //   return
    // }
  }
  return (
    "aaaaaaaaaaaaaaa"
  );
}

Notifications.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};



