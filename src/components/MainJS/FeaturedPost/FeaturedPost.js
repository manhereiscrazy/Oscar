import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Firestore } from '../../authentication/firebase';
import Badge from '@material-ui/core/Badge';

import clsx from 'clsx';

import { Slide, Snackbar, CardHeader, CardContent, CardActions, Card, TextField, Button, Grid, Avatar, CardActionArea, CardMedia, Hidden, Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Collapse, ListSubheader, IconButton, Paper, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@material-ui/core';
import { AvatarGroup, Alert } from '@material-ui/lab';

import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';

import EditFeaturedPost from './EditFeaturedPost';
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
  },
  menuitem: {
    fontSize: '13px',
    textOverflow: "elipsis"
  }
});

export default function FeaturedPost({ post, snackBar, setSnackBar }) {
  const { NotificationData, FeedPosts, paymentData, alerts, setAlerts, update, setUpdate, read, setRead } = useData();
  const { SignUp, currentUser, authUser } = useAuth();
  const classes = useStyles();

  const [showMore, setShowMore] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentValue, setCommentValue] = useState({
    value: "",
    length: COMENTS_MAX_LIMIT
  })
  const [expanded, setExpanded] = useState(false);
  const [isCommentOk, setIsCommentOk] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const commentRef = useRef()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  async function HandleEditPost(instance) {
    console.log(instance.id);

  }



  async function HandleDeletePost(instance) {
    try {
      if (instance.author.uid === currentUser.uid && instance.author.name === authUser.fName + " " + authUser.lName) {
        await Firestore.feed_posts.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === instance.id) {
              doc.ref.delete();
              setSnackBar({
                state: true, priority: "success", message: "Post Deleted Successfully"
              })
            }
          });
        });
        return
      } else {
        setSnackBar({
          state: true, priority: "error", message: "You cannot delete someone elses post, You can only delete your Post"
        })
        return
      }
    } catch (e) {
      console.log("###HDC", e.code, e.message, instance.id)
      return
    }
  }

  async function HandleAddComment(instance) {
    if (commentRef.current.value) {
      const commentCtx = {
        comment: commentRef.current.value,
        author: authUser && { uid: currentUser.uid, name: `${authUser.fName} ${authUser.lName}`, image: authUser.image.uri },
        createdAt: Date(),
        likes: [],
      }
      try {
        const comments_ = instance.comments;
        comments_.push(commentCtx);
        await Firestore.feed_posts.doc(instance.id).set({ ...instance, comments: comments_ }, { merge: true });
        setSnackBar({
          state: true, priority: "success", message: "Comment Added Successfully"
        })
        commentRef.current.value = ""
        setCommentValue({
          value: "",
          length: COMENTS_MAX_LIMIT
        })

      } catch (e) {
        console.log("###HAC", e.code, instance.id)
        return
      }
    } else { setIsCommentOk(false); return }

  }



  async function HandleDeleteComment(instance, i) {
    try {
      if (instance.comments[i].author.uid === currentUser.uid && instance.comments[i].author.name === authUser.fName + " " + authUser.lName) {
        const comments_ = instance.comments;
        comments_.splice(instance.comments[i], 1);
        setSnackBar({
          state: true, priority: "success", message: "Comment Deleted Successfully"
        })
        await Firestore.feed_posts.doc(instance.id).set({ ...instance, comments: comments_ }, { merge: true });
      } else {
        setSnackBar({
          state: true, priority: "error", message: "You cannot delete someone elses comment, You can only delete your comments"
        })
      }
    } catch (e) {
      console.log("###HDC", e.code, instance.id)
      setSnackBar({
        state: true, priority: "error", message: "Cannot delete comment"
      })
      return
    }
  }

  async function HandlePostLiked(instance) {
    try {
      const likes_ = instance.likes
      const commentee = {
        uid: currentUser.uid,
        name: authUser.fName + " " + authUser.lName,
        image: authUser.image.uri,
      }

      if (!likes_.some(likee => likee.uid === commentee.uid && likee.name === commentee.name)) {
        likes_.push(commentee);
        Firestore.feed_posts.doc(instance.id).set({ ...instance, likes: likes_ }, { merge: true });
        return
      } else {
        likes_.map((like, i) => {
          if (likes_[i].uid === commentee.uid && likes_, likes_[i].name === commentee.name) {
            likes_.splice(i, 1);
            Firestore.feed_posts.doc(instance.id).set({ ...instance, likes: likes_ }, { merge: true });
            return
          }
        })
      }
    } catch (e) {
      console.log("###HPL", e.code, instance.id)
      return
    }
  }



  async function handleCommentLiked(instance, i) {
    try {
      const comments_data = instance.comments
      const comments_ = comments_data[i];
      const commentee = {
        uid: currentUser.uid,
        name: authUser.fName + authUser.lName,
      }
      if (!comments_.likes.some(likee => likee.uid === commentee.uid && likee.name === commentee.name)) {
        comments_.likes.push(commentee);
        Firestore.feed_posts.doc(instance.id).set({ ...instance, comments: comments_data }, { merge: true });
        return
      } else {
        comments_.likes.map((like, i) => {
          if (comments_.likes[i].uid === commentee.uid && comments_.likes[i].name === commentee.name) {
            comments_.likes.splice(i, 1);
            Firestore.feed_posts.doc(instance.id).set({ ...instance, comments: comments_data }, { merge: true });
            return
          }
        })
      }
    } catch (e) {
      console.log("###HCL", e.code, instance.id)
      return
    }
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={6} md={6}>
        <CssBaseline />
        <Card elevation={3} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar alt="profile pic" src={post.author && post.author.image} />}
            action={
              <IconButton aria-label="settings" onClick={(e) => { e.preventDefault(); setAnchorEl(e.currentTarget) }}>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.author && post.author.name}
            subheader={`@${post.createdAt && post.createdAt.toDate().toString().split('GMT')[0]}`}
          />
          {post?.image?.uri ?
            <CardMedia
              className={classes.cardMedia}
              image={post?.image?.uri}
              title={post?.image?.name}
            /> : ""}
          <CardContent>
            <Typography className={post.priority && post.priority == 1 ? classes.priority1 : post.priority == 2 ? classes.priority2 : post.priority == 3 ? classes.priority3 : classes.priority0} component="h2" variant="h5" style={{ textTransform: 'capitalize', textDecoration: "underline" }} gutterBottom>
              {post.title}
            </Typography>
            <Typography gutterBottom variant="body2" color="inherit" className={classes.ExpandEDText} style={{ overflowWrap: "break-word", padding: "0px 10px" }}>
              {post.description.slice(0, 200)}
              {!showMore && post.description.length >= 200 ? <Typography className={classes.showMoreBtn} gutterBottom style={{ cursor: "pointer" }} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Continue Reading</Typography> : ""}
            </Typography>
            <Collapse in={showMore} timeout="auto" unmountOnExit>
              <Typography style={{ overflowWrap: "break-word", marginTop: "-5px", padding: "0px 10px" }} variant="body2" color="inherit" className={classes.ExpandEDText} >
                {post.description.slice(200, post.description.length) + " "}<p></p>
                <div style={{ margin: "auto", textAlign: "left", padding: "0" }}>
                  <Typography style={{ cursor: "pointer" }} gutterBottom className={classes.showMoreBtn} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Show Less...</Typography>
                </div>
              </Typography>
            </Collapse>
            {post.date || post.time ?
              <Typography variant="body2" style={{ color: "red", fontWeight: "bold", float: "right" }}>
                ( Event At: {post.date} {post.time})
          </Typography> : ' '
            }
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Badge badgeContent={post.comments.length} max={20} children={<ChatBubbleOutlineOutlinedIcon color={post.comments.length != 0 ? "secondary" : ""} />} />
            </IconButton>
            <IconButton aria-label="add to favorites" onClick={(e) => { e.preventDefault(); HandlePostLiked(post) }}>
              <FavoriteIcon style={{ color: post.likes?.some(likee => likee?.uid === currentUser?.uid) ? "red" : "#cfcfcf" }} />
            </IconButton>
            {post.likes.length >= 5 ?
              <Typography variant="body2" style={{ marginLeft: "-10px", textTransform: "lowercase", fontSize: "11px", height: "10px", width: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.likes.some(likee => likee?.uid === currentUser?.uid) ? "you, " : ""}
                {post.likes[5].map((likee) => likee.uid === currentUser.uid ? "" : `${likee.name},`)}{`+${post.likes.length - 5} More`}
              </Typography> :
              <Typography variant="body2" style={{ marginLeft: "-10px", textTransform: "lowercase", fontSize: "11px", height: "10px", width: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.likes.some(likee => likee?.uid === currentUser?.uid) ? "you, " : ""}
                {post.likes.map((likee) => likee.uid === currentUser.uid ? "" : `${likee.name},`)}
              </Typography>
            }
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List component="div" disablePadding>
                {post.comments.length != 0 ?
                  <>
                    <form className={classes.commentNewCont} onSubmit={(e) => { e.preventDefault(); HandleAddComment(post) }}>
                      <TextField
                        variant="outlined"
                        size="medium"
                        id="comment"
                        fullWidth
                        multiline
                        color="secondary"
                        label="Enter your comment"
                        inputProps={{
                          maxLength: COMENTS_MAX_LIMIT,
                        }}
                        inputRef={commentRef}
                        name="postitle"
                        helperText={commentValue.length == 250 ? `${commentValue.length} characters left` : commentValue.length == 0 ? <div style={{ color: "red" }}> {commentValue.length} characters left </div> : `${commentValue.length} characters left`}
                        autoComplete="postitle"
                        defaultValue={commentValue.value}
                        onChange={(e) => setIsCommentOk(true) || setCommentValue({ value: e.currentTarget.value, length: COMENTS_MAX_LIMIT - e.currentTarget.value.length })}
                      />
                      <div className={classes.commentNewCont}>
                        <div className={classes.commentNewItems}>
                          <Button
                            color="secondary"
                            props={classes.commentNewItemDia}
                            type="submit"
                            size="small"
                            disabled={!isCommentOk}
                            error={isCommentOk}
                            variant="outlined"
                            className={classes.submit}>
                            Comment
                      </Button>
                        </div>
                      </div>
                    </form>
                    {post?.comments?.map((comment, i) =>
                      <ListItem key={i} style={{ marginLeft: "-11px" }} className={classes.nested}>
                        {/* <Paper style={{ width: "100%", padding: "0px 0px" }} elevation={1} > */}
                        <ListItemText classes={{ primary: classes.listItemTextP, secondary: classes.listItemTextS }} secondary={
                          <>
                            <li>
                              <Typography variant="body2" style={{ overflowWrap: "break-word", padding: "0px 0px" }}>
                                {comment.comment}
                              </Typography>
                            </li>
                            <li style={{ float: "right", marginRight: "-10px" }} >
                              <IconButton onClick={(e) => { e.preventDefault(); handleCommentLiked(post, i) }}>
                                <Badge badgeContent={comment.likes.length} max={20} children={
                                  <FavoriteIcon style={{ color: comment.likes?.some(likee => likee?.uid === currentUser.uid) ? "red" : "#cfcfcf" }} />} />
                              </IconButton>
                            </li>
                          </>
                        } primary={
                          <div>
                            <ListItemAvatar>
                              <Avatar variant="circular" style={{ height: '40px', width: '40px', float: "left" }} alt="user image" src={comment?.author?.image} />
                              <IconButton aria-label="settings" style={{ float: "right", marginRight: "-10px" }} onClick={(e) => HandleDeleteComment(post, i)}>
                                <MoreVertIcon />
                              </IconButton>
                            </ListItemAvatar><p style={{ padding: "0px 50px" }}>
                              {`${comment?.author?.name}`}<br />
                              <li style={{ fontSize: "10px", color: "#b3b3b3" }}>{`${comment?.createdAt?.toString().split('GMT')[0]}`}</li></p>
                          </div>
                        } />
                        {/* </Paper> */}
                      </ListItem>
                    )
                    }
                  </>
                  :
                  <>
                    <ListItem button className={classes.nested}>
                      <ListItemText secondary="No Comments yet" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <form className={classes.form} onSubmit={(e) => { e.preventDefault(); HandleAddComment(post) }}>
                        <TextField
                          variant="outlined"
                          size="medium"
                          id="comment"
                          // required
                          multiline
                          color="secondary"
                          label="Be the first to comment" inputProps={{
                            maxLength: COMENTS_MAX_LIMIT
                          }}
                          inputRef={commentRef}
                          style={{ width: "250px" }}
                          name="postitle"
                          helperText={commentValue.length == 250 ? `${commentValue.length} characters left` : commentValue.length == 0 ? `${commentValue.length} characters left` : `${commentValue.length} characters left`}
                          autoComplete="postitle"
                          onChange={(e) => setIsCommentOk(true) || setCommentValue({ value: e.currentTarget.value, length: COMENTS_MAX_LIMIT - e.currentTarget.value.length })}
                        />
                        <div className={classes.commentNewCont}>
                          <div className={classes.commentNewItems}>
                            <Button
                              color="secondary"
                              props={classes.commentNewItemDia}
                              // onClick={HandleDataSubmit}
                              type="submit"
                              size="small"
                              disabled={!isCommentOk}
                              variant="outlined"
                              className={classes.submit}>Comment
                        </Button>
                          </div>
                        </div>
                      </form>
                    </ListItem>
                  </>
                }
              </List>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>


      {/* <Slide direction="up" > */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackBar.state}
        autoHideDuration={6000}
        onClose={(e) => setSnackBar({ state: false, priority: "Success", message: "" })}
        onClick={(e) => setSnackBar({ state: false, priority: "Success", message: "" })}
        TransitionComponent={Slide}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => setSnackBar({ state: false, priority: "success", message: "" })}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity={snackBar.priority}>{snackBar.message} <CloseIcon /></Alert>
      </Snackbar>
      {/* </Slide> */}

      <div>
        <Dialog
          open={Boolean(isOpen)}
          onClose={() => setIsOpen(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete post?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the post?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => { e.preventDefault(); setIsOpen(null) }} color="primary">
              Close
          </Button>
            <Button onClick={(e) => { e.preventDefault(); setIsOpen(null); HandleDeletePost(post) }} color="primary" autoFocus>
              Delete
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={Boolean(isEditOpen)}
          onClose={() => setIsEditOpen(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit post"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Feature is in dev stage, Please wait :)
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => { e.preventDefault(); setIsEditOpen(null) }} color="primary">
              Close
          </Button>
            <Button disabled onClick={(e) => { e.preventDefault(); setIsEditOpen(null); HandleDeletePost(post) }} color="primary" autoFocus>
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>


      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={(e) => { e.preventDefault(); setAnchorEl(null) }}
        >
          <MenuItem className={classes.menuitem} onClick={(e) => { e.preventDefault(); setAnchorEl(null); setIsEditOpen(post) }}>
            Edit
          </MenuItem>
          <MenuItem className={classes.menuitem} onClick={(e) => { e.preventDefault(); setAnchorEl(null); setIsOpen(post) }}>
            Delete
            </MenuItem>
        </Menu>
      </div>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};