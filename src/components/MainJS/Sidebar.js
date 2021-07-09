import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useAuth from '../authentication/Authentication';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Divider, Avatar, Link, IconButton, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl, Collapse } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MuiAlert from '@material-ui/lab/Alert';
import { Firestore } from '../authentication/firebase';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  linkData: {
    marginTop: theme.spacing(3),
  },
  linkDataicon: {

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
}));



export default function Sidebar({ notiFyRef, Announcemnets, sidebarData, setAlerts, Alerts, read, setRead }) {
  const classes = useStyles();
  const { SignOut, currentUser, authUser, serverTime } = useAuth();
  const [open, setOpen] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  async function HandleViewed(instance) {
    try {
      const viewers_ = instance.viewers;
      if (!viewers_.includes(currentUser.uid)) {
        viewers_.push(currentUser.uid);
        await Firestore.notifications.doc(instance.id).set({ ...instance, viewers: viewers_ }, { merge: true });
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
      <Grid item xs={12} md={4} ref={notiFyRef}>
        <CssBaseline />
        {/* ANnouncemnets */}

        <Grid item xs={12} md={12}>
          <Typography style={{ float: "right" }} variant="h6" gutterBottom className={classes.sidebarSection}>
            Notifcations
        </Typography>
          {Announcemnets &&
            !Announcemnets.length == 0 ?
            Announcemnets.map((ansmnt, i) =>
              <React.Fragment key={i}>
                <Grid container direction="row" spacing={1} justify="flex-start">
                  <Grid item style={{ width: "100vw" }}>
                    <Paper style={{ width: "100%" }} elevation={13} className={classes.sidebarAboutBox}>
                      <Grid container justify="space-between" className={classes.root} spacing={2}>
                        <Grid item>
                          <Typography className=
                            {
                              ansmnt.priority && ansmnt.priority == 1 ? classes.priority1 : ansmnt.priority == 2 ? classes.priority2 : ansmnt.priority == 3 ? classes.priority3 : classes.priority0
                            }
                            component="h2" variant="subtitle1" style={{ textTransform: 'capitalize' }}>
                            {ansmnt.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {ansmnt && ansmnt.did_read ?
                            <IconButton color="default" title="Seen">
                              <DoneAllIcon />
                            </IconButton> :
                            <IconButton color="secondary" title="Mark as seen" onClick={() => HandleViewed(ansmnt)}>
                              <DoneAllIcon />
                            </IconButton>

                          }
                        </Grid>
                      </Grid>
                      <div style={{ display: "flex" }}>
                        <Avatar alt="profile pic" style={{ height: "25px", width: "25px" }} src={ansmnt.author && ansmnt.author.image} />
                        <Typography variant="subtitle2" style={{ padding: "0px 5px" }} color="textSecondary" gutterBottom paragraph>
                          {ansmnt.author && ansmnt.author.name} @ {ansmnt.createdAt && ansmnt.createdAt.toDate().toString().split('GMT')[0]}
                        </Typography>
                      </div>
                      <Typography paragraph variant="subtitle2">{ansmnt.content}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) :
            <Grid container direction="row" spacing={4} justify="center">
              <Grid item sm={12} style={{ width: "100vw" }} xs={12}>
                <Paper elevation={13} className={classes.sidebarAboutBox}>
                  <Typography variant="subtitle1" gutterBottom>
                    No New Notifcations
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          }
        </Grid>
        
        <Typography variant="h6" className={classes.sidebarSection}>
          Find us on
      </Typography>
        <Divider />
        <Grid style={{ padding: "20px 0px" }} container direction="row" justify='space-between' spacing={5}>
          {sidebarData.social.map((network, i) => (
            <Grid item sm={2} key={i}>
              <Link className={classes.linkData} variant="body1" href={network.url} >
                <Grid item>
                  <network.icon style={{ color: network.color }} title={network.name} fontSize="small" />
                </Grid>
                {/* <Grid item> */}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {Announcemnets && Announcemnets[0] ?
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description" >
          <Paper elevation={24} className={classes.sidebarAboutBox}>
            <DialogTitle variant="h2" id="alert-dialog-title" onClose={handleClose} className=
              {
                Announcemnets[0].priority && Announcemnets[0].priority == 1 ? classes.priority1 : Announcemnets[0].priority == 2 ? classes.priority2 : Announcemnets[0].priority == 3 ? classes.priority3 : classes.priority0
              } style={{ textDecoration: "underlined" }}>
              {Announcemnets[0].title}
            </DialogTitle>
            <DialogContent>
              <div style={{ display: "flex", alignItems: "center", height: "auto" }}>
                <Avatar alt="profile pic" src={Announcemnets[0] && Announcemnets[0].author.image} />
                <span style={{ alignItems: "center" }}>
                  <Typography style={{ fontSize: "13px" }} variant="subtitle2" color="textSecondary">
                    {Announcemnets[0].author && Announcemnets[0].author.name} @ {Announcemnets[0].createdAt && Announcemnets[0].createdAt.toDate().toString().split('GMT')[0]}
                  </Typography>
                </span>
              </div>
              <Typography paragraph style={{ overflowWrap: "break-word", marginTop: "10px"}} className=
                {
                  Announcemnets[0].priority && Announcemnets[0].priority == 1 ? classes.priority1 : Announcemnets[0].priority == 2 ? classes.priority2 : Announcemnets[0].priority == 3 ? classes.priority3 : classes.priority0
                } variant="h6">
                {Announcemnets[0].content.slice(0, 100)}{!showMore && "..."}
                <Collapse in={showMore} timeout="auto" unmountOnExit>
                  {Announcemnets[0].content.slice(100, Announcemnets[0].content.length) + " "}
                  <div style={{ margin: "auto", textAlign: "left", padding: "0" }}>
                    <Typography style={{ cursor: "pointer" }} gutterBottom className={classes.showMoreBtn} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Show Less...</Typography>
                  </div>
                </Collapse>
                {!showMore && Announcemnets[0].content.length >= 100 ? <Typography className={classes.showMoreBtn} gutterBottom style={{ cursor: "pointer" }} variant="subtitle2" onClick={() => setShowMore(!showMore)}>Continue Reading</Typography> : ""}
              </Typography>


              {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph className=
                  {
                    Announcemnets[0].priority && Announcemnets[0].priority == 1 ? classes.priority1 : Announcemnets[0].priority == 2 ? classes.priority2 : Announcemnets[0].priority == 3 ? classes.priority3 : classes.priority0
                  } variant="h6">
                  {Announcemnets[0].content}
                </Typography>
              </Collapse> */}
            </DialogContent>
            <DialogActions>
              <ButtonGroup spacing={3} aria-label="outlined primary button group">
                <Button variant="outlined" color="secondary" onClick={handleClose}>CLOSE</Button>
                {/* <Button variant="outlined" color="secondary" onClick={()=>HandleViewed(Announcemnets[0])}>
                  Mark as read</Button> */}
              </ButtonGroup>
            </DialogActions>
          </Paper>
        </Dialog>
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
