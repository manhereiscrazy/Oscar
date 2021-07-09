import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Firestore } from '../../authentication/firebase';
import Badge from '@material-ui/core/Badge';

import clsx from 'clsx';

import { CardHeader, CardContent, CardActions, Card, TextField, Button, Grid, Avatar, CardActionArea, CardMedia, Hidden, Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Collapse, ListSubheader, IconButton, Paper, Divider } from '@material-ui/core';

import FeaturedPost from './FeaturedPost'
import NewFeaturedPost from './NewFeaturesPost';

import useAuth from '../../authentication/Authentication';
import useData from '../../authentication/DataProcess/DataFetch';


const COMENTS_MAX_LIMIT = 250;

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    height: "30vh",
    paddingTop: '56.25%',
  },
  mainFeaturedPostContentTitle: {
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
  commentNewCont: {
    textDecoration: "none",
  },
  commentNewItems: {
    float: "right"
  },
  commentText: {
    height: "50px",
  },
  CommentsBtn: {
    color: "black",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    // "&:hover": {
    //   color: "red",
    //   borderBottom:"1px solid red",
    //   textDecoration: "none",
    //   transition: ".5s ease-out",
    // },
    "&:active": {
      color: "blue",
      borderBottom: "1px solid blue",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
  },
  listItemTextP: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
  listItemTextS: {
    fontSize: '10px',
    textOverflow: "elipsis"
  }
});

export default function Featured() {
  const { NotificationData, FeedPosts, paymentData, alerts, setAlerts, update, setUpdate, read, setRead } = useData();
  const { SignUp, currentUser, authUser } = useAuth();
  const classes = useStyles();
  const [snackBar, setSnackBar] = useState(
    {
      state: false, priority: "success", message: ""
    })

  return (
    <>
      {/* <Paper style={{ width: "100%", padding: "10px 10px" }} className={classes.sidebarAboutBox}> */}
      <Typography className={classes.MainFePoTitle} variant="h6" gutterBottom>
        Feed
        </Typography>
      <Grid container justify="right" spacing={3}>
        <NewFeaturedPost />
      </Grid>
      <div style={{ float: "left",display:FeedPosts?"block":"none" }}>
        <Typography color="textSecondary" variant="subtitle2" s>
          New Posts
        </Typography>
      </div>
      <Grid style={{ marginTop: "0px" }} container spacing={3}>
        {FeedPosts && FeedPosts.map((post, index) =><FeaturedPost post={post} key={index} snackBar={snackBar} setSnackBar={setSnackBar} />)}
      </Grid>
      {/* </Paper> */}
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};