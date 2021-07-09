import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Card, CardActionArea, CardContent, CardMedia, Hidden, Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import useAuth from '../authentication/Authentication';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
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
});

export default function FeaturedPost({ post }) {
  const { SignUp, currentUser, authUser } = useAuth();
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false)

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} href={post.link}>
        <Card className={classes.card}>
          {/* <CardMedia className={classes.cardMedia} image={post.image.uri} /> */}
          <div className={classes.cardDetails}>
              <div style={{backgroundImage: `url(${post.image.uri})`,height:"30vh",width:"inherit", backgroundSize: 'cover', backgroundPosition: 'inherit',}} gutter></div>
            <CardContent>
              <Typography className={post.priority && post.priority == 1 ? classes.priority1 : post.priority == 2 ? classes.priority2 : post.priority == 3 ? classes.priority3 : classes.priority0} component="h2" variant="h5" style={{ textTransform: 'capitalize' }} gutterBottom>
                {post.title}
              </Typography>
              <div style={{ display: "flex" }}>
                <Avatar alt="profile pic" style={{height:"25px",width:"25px"}} src={post.author && post.author.image} />
                <Typography variant="subtitle2" style={{padding:"0px 5px"}} color="textSecondary" gutterBottom paragraph>
                  {post.author && post.author.name} @ {post.createdAt && post.createdAt.toDate().toString().split('GMT')[0]}
                </Typography>
              </div>

              <Typography variant="body2" color="inherit" className={classes.ExpandEDText} >
                {post.description}
              </Typography>
              {post.date || post.time ?
                <Typography variant="body2" color="textSecondary" >
                  Date: {post.date}, {post.time}
                </Typography> : ''}
              {showMore ?
                <>
                  <Typography variant="overline" color="inherit" className={classes.ExpandEDText} style={{ textTransform: 'capitalize', display: 'inline-block' }}>
                    {post.content && post.content}
                  </Typography>
                  <div style={{ margin: "auto", textAlign: "right", padding: "0" }}>
                    <Link className={classes.ExpandText} variant="subtitle1" onClick={() => setShowMore(!showMore)}>Show Less...</Link>
                  </div>
                </> :
                <>
                  <div style={{ margin: "auto", textAlign: "right", padding: "0" }}>
                    <Link className={classes.ExpandText} variant="subtitle1" onClick={() => setShowMore(!showMore)}>{post.content && post.content ? "Show More..." : ''}</Link>
                  </div>
                </>}
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};



