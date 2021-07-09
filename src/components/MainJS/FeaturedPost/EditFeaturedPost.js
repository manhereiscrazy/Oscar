import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Firebase, Firestore, Storage } from '../../authentication/firebase';

import clsx from 'clsx';

import { Badge, CardHeader, CardContent, CardActions, Card, TextField, Button, Grid, Avatar, CardActionArea, CardMedia, Hidden, Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Collapse, ListSubheader, IconButton, Paper, CssBaseline, Container, Box, CircularProgress, ThemeProvider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

import useAuth from '../../authentication/Authentication';
import useData from '../../authentication/DataProcess/DataFetch';


const COMENTS_MAX_LIMIT = 250;

const useStyles = makeStyles((theme) => ({
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
    imageButton: {
        height: "37px"
    }
}));



export default function EditFeaturedPost({post}) {
    console.log("POST",post)
    const { SignUp, currentUser, authUser } = useAuth();
    const classes = useStyles();

    const [imageFile, setImageFile] = useState();
    const [fileInfo, setFileInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [feedPostData, setFeedPostData] = useState();
    const [error, setError] = useState("");

    const contentRef = useRef()

    function HandleImageSelect(e) {
        setImageFile()
        const image = e.target.files[0]
        if (image && image.type == "image/jpeg" || image.type == "image/png") {
            setImageFile({ image: image, progress: null })
            const UploadTask = Storage.ref(`/Images/UserImages/${currentUser.uid}/Feed_Post/${image.name}`).put(image)
            UploadTask.on("state_changed",
                snapshot => {
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes
                    setLoading(progress * 100 == 100 ? false : true)
                    setImageFile({ image: image, progress: progress * 100 })
                },
                () => { },
                () => {
                    UploadTask.snapshot.ref.getDownloadURL().then(url => {
                        console.log("FILES213", url)
                        setFileInfo({
                            fileName: image.name,
                            fileType: image.type,
                            fileSize: image.size,
                            uri: url,
                        })
                    })
                }
            )
        }
    }


    function HandleDataSubmit(e) {
        if (!contentRef.current.value) {
            setError("Please enter something first");
            return
        }
        try {
            setFeedPostData({
                visible: true,
                user_id: currentUser.uid,
                createdAt: Firestore.serverTime(),
                priority: 0,
                title: null,
                date: null,
                time: null,
                author: {
                    name: authUser.fName + " " + authUser.lName,
                    image: authUser.image.uri
                },
                image: fileInfo ? fileInfo : null,
                description: contentRef.current.value,
                viewers: [],
                likes: [],
                comments: [],
            });
        }
        catch (e) {
            setError("Enter the required fields" + e.code);
            console.log("error", e.code);
            // setFieldOK(false);
        };
    }


    async function HandleOnSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await Firestore.feed_posts.add(feedPostData)
            setError("");
            setLoading(false);
            setImageFile()
            setFileInfo()
            contentRef.current.value = null
            return
        } catch (e) {
            setError("Error occurd, Your couldnt post");
            console.log("ERROR", e.code)
            setLoading(false);
            return
        }
    }
    return (
        <>
            <Grid item sm={12} xs={12} md={6}>
                <div style={{ float: "right" }}>
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                        Whats on your mind?
                </Typography>
                </div>
                <form className={classes.form} noValidate onSubmit={HandleOnSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                id="content"
                                required = {error? false : true}
                                error={error}
                                onChange={() =>setError("")}
                                helperText={error}
                                inputRef={contentRef}
                                color="secondary"
                                label={error ? error : "Post Something"}
                                name="postitle"
                                autoComplete="postitle"
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <div style={{ float: "right", padding: "0px 5px" }}>
                                <Button
                                    onClick={HandleDataSubmit}
                                    type="submit"
                                    fullWidth
                                    disabled={loading || error}
                                    variant="outlined"
                                    color="default"
                                    error={error}
                                    onChange={() =>setError("")}
                                    helperText={error}
                                    className={classes.submit}>
                                    {loading ? "Please Wait" : "Post"}
                                </Button>
                            </div>
                            <div style={{ float: "right" }}>
                                <Button fullWidth disabled={imageFile && !imageFile.progress == 100} title={imageFile && imageFile.name} className={classes.imageButton} variant="outlined" component="label" >
                                    <><CameraAltOutlinedIcon />upload</>
                                    <input type="file" onChange={HandleImageSelect || setImageFile()} hidden />
                                    <CircularProgress variant="determinate"
                                        color="secondary"
                                        thickness="5" size="20px"
                                        style={{ padding: "30px 0px" }}
                                        value={imageFile && imageFile.progress} />
                                </Button>
                            </div>
                        </Grid>
                        {imageFile && imageFile.progress == 100 ?
                            <Alert severity="success"><div style={{ textOverflow: "ellipsis" }}>{imageFile && imageFile.image.name} Uploaded successfully
                                </div></Alert> : imageFile && !imageFile.progress == 0 ?
                                <Alert severity="warning"><div style={{ textOverflow: "ellipsis" }}>{imageFile && imageFile.image.name} Uploading {imageFile && Math.floor(imageFile.progress)}%
                                </div></Alert>
                                : ""
                        }
                    </Grid>
                </form>
            </Grid>
            <Grid style={{ marginBottom: "40px" }} item xs={3} sm={3} md={6} component={Box} display={{ xs: "none", md: "block" }}>
                <div style={{ float: "right" }}>
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                        Locate us
                    </Typography>
                </div>
            </Grid>
            <Grid style={{ marginBottom: "10px" }} item xs={12} sm={3} md={6} component={Box} display={{ xs: "block", md: "none", lg: "none" }}>
            </Grid>
        </>
    );
}
{/* <Card>
                <CardHeader
                    avatar={
                        <Avatar alt="profile pic"  />}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />P
                        </IconButton>
                    }
                    title={"post.author && post.author.name"}
                    subheader={"${post.createdAt && post.createdAt.toDate().toString().split('GMT')[0]}"}
                />
                    <CardMedia
                        className={classes.cardMedia}
                        // image={post?.image?.uri}
                        // title={post?.image?.name}
                    /> 
                <CardContent>
                    
                    
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">A
                        <Badge badgeContent={10} max={13} children={
                            <FavoriteIcon style={{ color: "#cfcfcf" }} />}
                        />
                    </IconButton>
                </CardActions>
                    <CardContent>
                        <List component="div" disablePadding>
                                <>
                                    <form className={classes.commentNewCont}>
                                        
                                    </form>
                                    
                                </>
                                
                        </List>
                </CardContent>
            </Card> */}