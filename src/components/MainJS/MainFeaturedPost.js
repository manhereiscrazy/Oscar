import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { CardHeader, CardContent, CardActions, Card, TextField, Button, Grid, Avatar, CardActionArea, CardMedia, Hidden, Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Collapse, ListSubheader, IconButton, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainFeaturedPostContentTitle: {
    fontWeight: "bold",
    "&:active": {
      color: "red",
      transition: "1s ease-out",
    },
  },
  ExpandText: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      color: "red",
      fontWeight: "bold",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
  },
  showMoreBtn: {
    color: "inherit",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    "&:hover": {
      color: "red",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
    "&:active": {
      color: "blue",
      textDecoration: "none",
      transition: ".5s ease-out",
    },
  },
}));

export default function MainFeaturedPost({ post }) {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false)

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})`}}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={12}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography className={classes.mainFeaturedPostContentTitle} component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.place}
            </Typography>
              <Typography style={{width:"95%"}} variant="body2" color="inherit" className={classes.ExpandEDText} >
                  {post.description.slice(0, 200)}
                  {!showMore ? <Typography style={{cursor:"pointer"}} className={classes.showMoreBtn} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Continue Reading</Typography> :""}
                </Typography>
            <Collapse in={showMore} timeout="auto" unmountOnExit>
              <Typography style={{width:"95%"}} variant="body2" color="inherit" className={classes.ExpandEDText} >
                {post.description.slice(200, post.description.length) + " "}<p></p>
                <div style={{ margin: "auto", textAlign: "left", padding: "0" }}>
                  <Typography style={{cursor:"pointer"}} className={classes.showMoreBtn} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Show Less...</Typography>
                </div>
              </Typography>
            </Collapse>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};