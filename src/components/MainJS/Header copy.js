import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import AppDrawer from './appBar'

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import { IconButton, Badge, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl, MenuIcon, Menu, MenuItem, Avatar } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useAuth from '../authentication/Authentication';
import { Route, Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    "&:hover": {
      color: "red"
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
}));

export default function Header({ sections, title, paymentData, alerts, setAlerts }) {
  const classes = useStyles();
  const { SignOut, currentUser, authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory()
  const [error, setError] = useState("")
  const [Notifi, setNotifi] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
    handleMobileMenuClose();
    setNotifi(null)
  };

  const handleMenuNotifiClose = (alert) => {
    const ale = [...alerts]
    ale.pop(alert)
    setAlerts(ale)
    setNotifi(null)
  };

  const handleMenuSelect = (alert) => {
    setNotifi(alert)
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false)
    setOpen(false);
  };


  async function handleSignOut(e) {
    setError("")
    e.preventDefault()

    try {
      await SignOut();
      setOpen(false);
      history.push("/logout")
    } catch (e){
      setError("Failed to log out " + e)
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppDrawer />
      <Toolbar className={classes.toolbar}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
          <Avatar alt="profile pic" src={authUser && authUser.image.uri} onClick={()=>setOpen(!open)}/>
          </Badge>
        </IconButton>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          className={classes.toolbarTitle}
        >Welcome {currentUser && authUser && authUser.fName}</Typography>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={'primary-search-account-menu'}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {alerts &&
            alerts.map((alert, i) => (
              !alert.amount ?
              <MenuItem key={i} onClick={handleMenuClose}>
                <Typography noWrap variant="subtitle2" color="textSecondary">{alert.title}
                </Typography>
              </MenuItem>
              :
              <MenuItem key={i} onClick={() => handleMenuSelect(alert)}>
                <Typography noWrap variant="subtitle2" color="textSecondary">Pay {alert.title} ₹{alert.amount} before {alert.date.toString().split('GMT')[0]}
                </Typography>
              </MenuItem>
            ))
          }

        </Menu>
        {alerts && alerts ?
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
        {/* {
          currentUser ? <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>Logout</Button> :
            window.alert("couldnt signout")
          // <Redirect to="/login" />
        } */}
      </Toolbar>
      <CssBaseline />
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
      <Dialog
        open={Boolean(Notifi)}
        onClose={()=>handleMenuNotifiClose(Notifi)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" onClose={()=>handleMenuNotifiClose(Notifi)} style={{ textDecoration: "underlined" }}>
          Hey {authUser && authUser.fName}
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
          {Notifi && !Notifi.amount ?
            <Typography className={classes.MainFePoTitle} variant="h6" gutterBottom>
              {Notifi.title}
            </Typography>
          :
            <Typography style={{color:"red"}} className={classes.MainFePoTitle} variant="h6" gutterBottom>
              {Notifi && 
              `You did not pay your rent for ${Notifi.date.toString().split('GMT')[0]}. Please Pay ${Notifi.title} ₹${Notifi.amount} before ${Notifi.date.toString().split('GMT')[0]} to avoid fines and consequencess`}
            </Typography>
          }
      
        </DialogContent>
        <DialogActions>
          <ButtonGroup gutterBottom spacing={3} aria-label="outlined primary button group">
            <Button variant="outlined" size="large" color="primary" onClick={()=>handleMenuNotifiClose(Notifi)}>Close</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};