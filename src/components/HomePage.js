import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Typography, Card, CardContent, CardMedia, CardActions, CssBaseline, Grid, Container, Box, Paper, CardActionArea, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, InputLabel, FormControl } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';

import useAuth from './authentication/Authentication';
import useData from './authentication/DataProcess/DataFetch'

import Header from './MainJS/Header';
import MainFeaturedPost from './MainJS/MainFeaturedPost';
import Featured from './MainJS/FeaturedPost/Featured';
import Sidebar from './MainJS/Sidebar';
import FeaturedNews from './MainJS/News/FeaturedNews';

import Copyright from './authentication/DataProcess/copyright'
import LoadingScreen from './authentication/LoadingScreen'


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    // backgroundImage:"linear-gradient(bottom,white, rgba(255,0,0,0.5),white )",
  },
}));

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];



const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];


const NEws = [
  { title: 'President', name: "PresidentName", image: "" },
  { title: 'Secretory', name: "Secretory", image: "" },
  { title: 'Vice-President', name: "Vice-President", image: "" },
]

const sidebarData = {
  title: 'Announcements',
  description:
    'Rent for April Should be given by 14-04-2021',
  news: [
    { title: '#RentForApril', text: "Rent for April Should be given by 14-04-2021", url: '#' },
    { title: '#KeepTheClubClean', text: "Keep our club clean by not throwing wastes on the ground, put the waste in the bin", url: '#' },
    { title: '#FlushTheToilet', text: "Remeber to flush the toilet after using", url: '#' },
    { title: '#GiveSuggstions', text: "Give your suggestions and comments about club", url: '#' },
  ],



  social: [
    { name: 'Twitter', icon: TwitterIcon, color: "red", url: '#' },
    { name: 'Facebook', icon: FacebookIcon, color: "red", url: '#' },
    { name: 'WhatsApp', icon: WhatsAppIcon, color: "red", url: '#' },
    { name: 'Instagram', icon: InstagramIcon, color: "red", url: '#' },
    { name: 'Telegram', icon: TelegramIcon, color: "red", url: '#' },
  ], archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
};

const About = {
  title: 'Club de OSCAR',
  place:
    "Udumbannoor, Thodupuzha",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content.',
};

export default function HomePage({ notiFyRef }) {
  const { SignOut, currentUser, authUser, serverTime, loading } = useAuth();
  const { NotificationData, FeedPosts, paymentData, alerts, setAlerts, update, setUpdate, read, setRead } = useData();
  const [open, setOpen] = useState(true)
  const classes = useStyles();



  const handleClose = () => {
    setOpen(false);
  };


  return (
    authUser ? 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg"  style={{overflowX:"hidden",overflowY:"hidden"}}>
        <Header alerts={alerts} setAlerts={setAlerts} />
        <main>
          <MainFeaturedPost post={About} />
          <Grid container>
            <Featured/>
          </Grid>
          <Grid container className={classes.mainGrid} alignItems="center" justify="space-between" spacing={4}>
            {/* <FeaturedNews newsdata={NEws} /> */}
            <Sidebar
              notiFyRef={notiFyRef}
              Announcemnets={NotificationData}
              sidebarData={sidebarData}
              setAlerts={setAlerts}
              Alerts={alerts}
              read={read}
              setRead={setRead}
            />
          </Grid>
        </main>
      </Container>
      <Copyright/>
    </React.Fragment> : <LoadingScreen/>
  );
}
