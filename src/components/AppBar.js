import React, { useState, useRef } from 'react';
import useAuth from './authentication/Authentication';
import useData from './authentication/DataProcess/DataFetch';
import { Route, Redirect, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Drawer, AppBar, Toolbar, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Badge, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl, MenuIcon, Menu, MenuItem, Avatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  mainappbar: {
    // backgroundImage:"linear-gradient(top, rgba(0,255,0,0.5), white)"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    flex: 1,
    color: "grey",
    "&:hover": {
      color: "black"
    },
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  listItemTextP: {
    fontSize: "14px",
    // color:"red"
  },
  listItemTextS: {
    fontSize: "10px",
  },
}));
export default function AppDrawer({ title, notiFyRef }) {
  const { SignOut, currentUser, authUser } = useAuth();
  const { NotificationData, FeedPosts, paymentData, alerts, setAlerts, update, setUpdate, read, setRead } = useData();
  const classes = useStyles();
  const history = useHistory()

  const [drawerstate, setDrawerstate] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [NotiFy, setNotiFy] = useState(true);
  const [error, setError] = useState("")
  const [Notifi, setNotifi] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // const handleNotFyClose = (payment) => {
  //   NotiFies.pop(payment)
  // };

  const handleMenuNotifiClose = (alert) => {
    const ale = alerts
    ale.pop(alert)
    setAlerts(ale)
    setNotifi(null)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
    handleMobileMenuClose();
    setNotifi(null)
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuSelect = (alert) => {
    setNotifi(alert)
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const toggleDrawer = () => {
    setDrawerstate(true);
  };

  const toggleDrawerClose = () => {
    setDrawerstate(false);
  };

  const executeScroll = () => {
    setAnchorEl(null);
    notiFyRef.current.scrollIntoView()
  }

  const handleClose = () => {
    setDrawerstate(false);
    setAnchorEl(null);
    setMenuOpen(false)
    setOpen(false);
  };


  async function handleSignOut(e) {
    setError("")
    e.preventDefault()

    try {
      setDrawerstate(false);
      await SignOut();
      setOpen(false);
      history.push("/login")
    } catch (e) {
      setError("Failed to log out " + e)
    }
  }

  const Navigations = [
    { text: "About", icon: "icon", link: "", action: null },
    { text: "Contact", icon: "icon", link: "", action: null },
    { text: "Notifications", icon: "icon", link: "", action: null },
    { text: "Payments", icon: "icon", link: "", action: null },
  ]
  const NavigationsAdmin = [
    { text: "New Payment", icon: "icon", link: "/payment/new" },
    { text: "New Notification", icon: "icon", link: "/notification/new" },
    { text: "New FeedPost", icon: "icon", link: "/post/new" },
    { text: "Logout", icon: "icon", link: "" },
  ]

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawerClose}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button onClick={() => history.push("profile/edit") && toggleDrawerClose}>
          <ListItemText primary={`${authUser && authUser.fName} ${authUser && authUser.lName}`} secondary={`${authUser && authUser.Email}`} />
          <ListItemIcon>
            <Badge color="secondary">
              <Avatar alt="profile pic" src={authUser && authUser.image.uri} />
            </Badge>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider style={{ backgroundColor: "#f1f1f1" }} />

      <List>
        {Navigations.map((navigation, index) => (
          <ListItem button style={{ color: "secondary" }} key={index} onClick={() => history.push(navigation?.link) && toggleDrawerClose}>
            <ListItemIcon>
              {navigation.icon}
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemTextP }} primary={navigation.text} />
          </ListItem>
        ))}
        <ListItem button style={{ color: "secondary" }} onClick={() => setDrawerstate(false) || setOpen(true)}>
        <ListItemIcon>
          icon
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.listItemTextP }} primary={"Logout"} />
      </ListItem>
      </List>
      <Divider style={{ backgroundColor: "#f1f1f1" }} />
      {authUser && authUser.is_admin ?
        <List>
          {NavigationsAdmin.map((navigation, index) => (
            <ListItem button key={index} onClick={() => history.push(navigation.link) && toggleDrawerClose}>
              <ListItemIcon>
                {navigation.icon}
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listItemTextP }} primary={navigation.text} />
            </ListItem>
          ))}
        </List> : ""
      }
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer open={drawerstate} onClose={toggleDrawerClose}>
          {list()}
        </Drawer>
        <AppBar position="fixed" color="inherit" elevation="0" className={classes.mainappbar}>
          <Toolbar>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge color="secondary">
                <Avatar alt="profile pic" src={authUser && authUser.image.uri} onClick={toggleDrawer} />
              </Badge>
            </IconButton>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="left"
              className={classes.toolbarTitle}
            >
              {title ? title : `Welcome ${currentUser && authUser && authUser.fName}`}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={'primary-search-account-menu'}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {alerts?.map((alert, i) => (
                  alert.is_noti ?
                    <MenuItem key={i} onClick={executeScroll}>
                      <Typography noWrap variant="subtitle2" color="textSecondary">{alert.title}
                      </Typography>
                    </MenuItem>
                    :
                    <MenuItem key={i} onClick={() => handleMenuSelect(alert)}>
                      {
                        !alert?.p_type?
                        <Typography noWrap variant="subtitle2" color="textSecondary">Pay Rent Rs ₹{alert.amount} for {alert.month}, before {alert?.date?.toString().split('GMT')[0]}
                        </Typography> :
                      <Typography noWrap variant="subtitle2" color="textSecondary">Pay Rs ₹{alert.amount} for {alert.description}, before {alert.date.toString().split('GMT')[0]}
                      </Typography>
                    }
                    </MenuItem>
                ))
              }

            </Menu>
            {alerts && alerts.length != 0 ?
              <IconButton onClick={handleNotificationMenuOpen} aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={alerts.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              :
              <IconButton aria-label="shownew notifications" color="inherit">
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            }
          </Toolbar>
        </AppBar>


        <Dialog
          open={Boolean(Notifi)}
          onClose={() => handleMenuNotifiClose(Notifi)}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" onClose={() => handleMenuNotifiClose(Notifi)} style={{ textDecoration: "underlined" }}>
            Hey {authUser && `${authUser.fName} ${authUser.lName}`}
          </DialogTitle>
          <DialogContent>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
            {Notifi && Notifi.p_type ?
              <Typography className={classes.MainFePoTitle} variant="h6" gutterBottom>
                {
                  `You forgot to pay for '${Notifi.description}'. Please pay Rs ₹${Notifi.amount} before ${Notifi.date.toString().split('GMT')[0]}`}
              </Typography>
              :
              <Typography style={{ color: "red" }} className={classes.MainFePoTitle} variant="h6" gutterBottom>
                {Notifi && 
                  `You forgot to pay rent for ${Notifi.month}. Please pay Rs ₹${Notifi.amount} before ${Notifi?.date?.toString().split('GMT')[0]} to avoid fines and consequencess`}
              </Typography>
            }
          </DialogContent>
          <DialogActions>
            <ButtonGroup gutterBottom spacing={3} aria-label="outlined primary button group">
              <Button variant="outlined" size="large" color="primary" onClick={() => handleMenuNotifiClose(Notifi)}>Close</Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>

        < Dialog
          open={NotiFy && paymentData && paymentData[0]}
          onClose={() => setNotiFy(false)}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" onClose={() => setNotiFy(false)} style={{ textDecoration: "underlined" }}>
            Hey {authUser && `${authUser.fName} ${authUser.lName}`}
          </DialogTitle>
          <DialogContent>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
            {paymentData && paymentData[0]?.p_type ?
              <Typography style={{ color: "red" }} className={classes.MainFePoTitle} variant="h6" gutterBottom>
                {`You havent paid for '${paymentData[0]?.description}'.`} {`Please pay Rs ₹${paymentData[0]?.amount} before ${paymentData[0]?.date.toString().split('GMT')[0]}`}
              </Typography>
              :
              <Typography style={{ color: "red" }} className={classes.MainFePoTitle} variant="h6" gutterBottom>
                {paymentData &&
                  `You did not pay your rent for ${paymentData[0]?.month}. Please pay Rs ₹${paymentData[0]?.amount} before ${paymentData[0]?.date.toString().split('GMT')[0]} to avoid fines and consequencess`}
              </Typography>
            }
          </DialogContent>
          <DialogActions>
            <ButtonGroup gutterBottom spacing={3} aria-label="outlined primary button group">
              <Button variant="outlined" size="large" color="primary" onClick={() => setNotiFy(false)}>Close</Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" onClose={handleClose} style={{ textDecoration: "underlined" }}>
            Hey {authUser && authUser.fName}, Wait a sec!
          </DialogTitle>
          <DialogContent>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
            <Typography className={classes.MainFePoTitle} variant="h6" gutterBottom>Are you sure want to Logout? You have to re login again to use the app</Typography>
          </DialogContent>
          <DialogActions>
            <ButtonGroup gutterBottom spacing={3} aria-label="outlined primary button group">
              <Button variant="outlined" size="large" color="primary" onClick={handleClose}>Back</Button>
              <Button variant="outlined" size="large" fullWidth color="secondary" onClick={handleSignOut}>Logout</Button>
            </ButtonGroup>
          </DialogActions>
        </Dialog>
        <div className={classes.toolbar}></div>
      </React.Fragment>
    </div >
  );
}