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


export default function RentInfo() {
  const { SignOut, currentUser, authUser, serverTime } = useAuth();
  const [Posts, setPosts] = useState()
  const [AnnouncementData, setAnnouncementData] = useState()
  const [read, setRead] = useState()
  const [open, setOpen] = useState(true)
  const classes = useStyles();



  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    var featuredpost = []
    return Firestore.feed_posts.where('visible', '==', true).orderBy('createdAt', 'desc').onSnapshot((posts) => {
      posts.forEach(post => {
        featuredpost.push(post.data());
      })
      setPosts(featuredpost);
    })
  }, [])


  return (
    // <div style={{background:'url(https://source.unsplash.com/random/1024x768/)',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',}}>
    <React.Fragment>
      HEYYYYYYYYYYYYYYY
    </React.Fragment>
    // </div>
  );
}