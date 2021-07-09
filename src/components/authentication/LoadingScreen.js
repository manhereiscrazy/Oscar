import React from 'react'
import { makeStyles } from '@material-ui/core/styles'; import { CircularProgress, IconButton, Badge, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl, MenuIcon, Menu, MenuItem, Avatar } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    postion: "fixed",
    height: "100%",
    width: "100%",
    backgroundImage: 'url(https://source.unsplash.com/random/1024x768/)',
    backgroundSize: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: "-10"
  },
  ctx: {
    height: "20vh",
    width: "30vw",
    border: "5px solid White",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    // opacity:"0.1",
    overflow: "hidden"
  },
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
    zIndex: "1"
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    fontWeight: "bolder",
    padding: "10px 10px",
    zIndex: "1"
  },
}));


export default function LoadingScreen() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.ctx}>
        <div className={classes.circle}>
          <CircularProgress color="secondary" />
        </div>
        <div className={classes.text}>
          <Typography className={classes.MainFePoTitle} variant="h6">Please Wait...</Typography>
        </div>
      </div>
    </div>
  )
}
