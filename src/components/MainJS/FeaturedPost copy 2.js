import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Firestore } from '../authentication/firebase';



import { TextField, Button, Grid, Avatar, Card, CardActionArea, CardContent, CardMedia, Hidden, Typography } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import { List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import useAuth from '../authentication/Authentication';


const COMENTS_MAX_LIMIT = 250;

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
  listItemTextP:{
    fontSize:'13px',
    fontWeight:'bold',
  },
  listItemTextS:{
    fontSize:'10px',
  }
});

export default function FeaturedPost({ post, setUpdate, update }) {
  const { SignUp, currentUser, authUser } = useAuth();
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentValue, setCommentValue] = useState({
    value: "",
    length: COMENTS_MAX_LIMIT
  })
  const commentRef = useRef()

  async function HandleAddComment(instance) {
    if (commentRef.current.value) {
      const commentCtx = {
        comment: commentRef.current.value,
        author: authUser && { name: `${authUser.fName} ${authUser.lName}`, image: authUser.image.uri },
        createdAt: Date(),
      }
      try {
        const comments_ = instance.comments;
        comments_.push(commentCtx);
        console.log("###DBG234", comments_)
        await Firestore.feed_posts.doc(instance.id).set({ ...instance, comments: comments_ }, { merge: true });
        commentRef.current.value = ""
        setCommentValue({
          value: "",
          length: COMENTS_MAX_LIMIT
        })
        setUpdate(!update)
      } catch (e) {
        console.log("###DBG3", e.code, instance.id)
        return
      }
    } else { return }

  }

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} raised>
        {/* <CardMedia className={classes.cardMedia} image={post.image.uri} /> */}
        <div className={classes.cardDetails}>
          <div style={{ backgroundImage: `url(${post.image.uri})`, height: "30vh", width: "inherit", backgroundSize: 'cover', backgroundPosition: 'inherit', }} gutter></div>
          <CardContent>
            <Typography className={post.priority && post.priority == 1 ? classes.priority1 : post.priority == 2 ? classes.priority2 : post.priority == 3 ? classes.priority3 : classes.priority0} component="h2" variant="h5" style={{ textTransform: 'capitalize' }} gutterBottom>
              {post.title}
            </Typography>
            <div style={{ display: "flex" }}>
              <Avatar alt="profile pic" style={{ height: "25px", width: "25px" }} src={post.author && post.author.image} />
              <Typography variant="subtitle2" style={{ padding: "0px 5px" }} color="textSecondary" gutterBottom paragraph>
                {post.author && post.author.name} @ {post.createdAt && post.createdAt.toDate().toString().split('GMT')[0]}
              </Typography>
            </div>
            {showMore ?
              <Typography variant="body2" color="inherit" className={classes.ExpandEDText} >
                {post.description.slice(0, post.description.length) + " "}<p></p>
                <div style={{ margin: "auto", textAlign: "right", padding: "0" }}>
                  <Typography className={classes.ExpandText} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Show Less...</Typography>
                </div>
              </Typography>
              :
              (post.description.length >= 200 ?
                <Typography variant="body2" color="inherit" className={classes.ExpandEDText} >
                  {post.description.slice(0, 200) + "... "}
                  <Typography className={classes.ExpandText} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Continue Reading</Typography>
                </Typography> :
                <Typography gutterBottom variant="body2" color="inherit" className={classes.ExpandEDText} >
                  {post.description.slice(0, post.description.length) + " "}
                </Typography>)
            }
            {post.date || post.time ?
              <Typography variant="body2" style={{ color: "red", fontWeight: "bold" }}>
                ( Date of Event: {post.date}, {post.time})
                </Typography> : ' '}

            <div style={{ margin: "auto", textAlign: "right", padding: "0" }}>
              <Button variant="none" color="secondary" className={classes.CommentsBtn} onClick={() => setShowComments(!showComments)}>
                {post && post.comments.length} Comments
                    </Button>
            </div>

            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.commentsList}
            >
              <Collapse in={showComments} timeout="auto" unmountOnExit >
                <List component="div" disablePadding>
                  {post.comments ?
                    <>
                      <ListItem button className={classes.nested}>
                        <form className={classes.commentNewCont} onSubmit={(e) => { e.preventDefault(); HandleAddComment(post) }}>
                          <TextField
                            variant="outlined"
                            size="medium"
                            id="comment"
                            required
                            multiline
                            color="secondary"
                            label="Enter your comment" inputProps={{
                              maxLength: COMENTS_MAX_LIMIT
                            }}
                            inputRef={commentRef}
                            // onChange={() => setFieldOK(true) || setError("")}
                            // helperText={!fieldOK ? "Required" : ''}
                            style={{ width: "250px" }}
                            name="postitle"
                            helperText={commentValue.length == 250 ? `${commentValue.length} characters left` : commentValue.length == 0 ? `${commentValue.length} characters left` : `${commentValue.length} characters left`}
                            autoComplete="postitle"
                            defaultValue={commentValue.value}
                            onChange={(e) => setCommentValue({ value: e.currentTarget.value, length: COMENTS_MAX_LIMIT - e.currentTarget.value.length })}
                          />
                          <div className={classes.commentNewCont}>
                            <div className={classes.commentNewItems}>
                              <Button
                                color="secondary"
                                props={classes.commentNewItemDia}
                                // onClick={HandleDataSubmit}
                                type="submit"
                                size="small"
                                // disabled={loading || error}
                                variant="outlined"
                                className={classes.submit}>
                                Comment
                                {/* {loading ? "Please Wait" : "Create post"} */}
                              </Button>
                            </div>
                          </div>
                        </form>
                      </ListItem>
                      {post.comments.map((comment, i) =>
                        <ListItem key={i} button className={classes.nested}>
                          <ListItemAvatar>
                            <Avatar variant="circular" style={{ height: '40px', width: '40px' }} alt="Travis Howard" src={comment.author.image} />
                          </ListItemAvatar>
                          <ListItemText classes={{primary:classes.listItemTextP,secondary:classes.listItemTextS}} primary={`${comment.comment}`} secondary={`${comment.author.name} @ ${comment.createdAt.toString().split('GMT')[0]}`} />
                        </ListItem>
                      )
                      }
                    </>
                    :
                    <>
                      <ListItem button className={classes.nested}>
                        <ListItemText secondary="No Comments, be the first to comment" />
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <form className={classes.form} onSubmit={(e) => { e.preventDefault(); HandleAddComment(post) }}>
                          <TextField
                            variant="outlined"
                            size="medium"
                            id="comment"
                            required
                            multiline
                            color="secondary"
                            label="Enter your comment" inputProps={{
                              maxLength: COMENTS_MAX_LIMIT
                            }}
                            inputRef={commentRef}
                            // onChange={() => setFieldOK(true) || setError("")}
                            // helperText={!fieldOK ? "Required" : ''}
                            style={{ width: "250px" }}
                            name="postitle"
                            helperText={commentValue.length == 250 ? `${commentValue.length} characters left` : commentValue.length == 0 ? `${commentValue.length} characters left` : `${commentValue.length} characters left`}
                            autoComplete="postitle"
                            onChange={(e) => setCommentValue({ value: e.currentTarget.value, length: COMENTS_MAX_LIMIT - e.currentTarget.value.length })}
                          />
                          <div className={classes.commentNewCont}>
                            <div className={classes.commentNewItems}>
                              <Button
                                color="secondary"
                                props={classes.commentNewItemDia}
                                // onClick={HandleDataSubmit}
                                type="submit"
                                size="small"
                                // disabled={loading || error}
                                variant="outlined"
                                className={classes.submit}>
                                Comment
                                {/* {loading ? "Please Wait" : "Create post"} */}
                              </Button>
                            </div>
                          </div>
                        </form>
                      </ListItem>
                    </>
                  }
                </List>
              </Collapse>
            </List>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};