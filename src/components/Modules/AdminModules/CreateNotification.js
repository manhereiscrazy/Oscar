import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../../authentication/Authentication';
import { useHistory } from "react-router-dom";
import { Firebase, Firestore, Storage } from '../../authentication/firebase';

import { CircularProgress, Avatar, Container, Grid, Checkbox, TextField, Box, Typography, Switch } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, Paper } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Copyright from '../../authentication/DataProcess/copyright';
import AppDrawer from '../../AppBar'

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: "100vh"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        marginTop: "-65px",
        // minWidth: "100%",
    },
}));

export default function CreateNotification() {
    const history = useHistory();
    const { SignUp, currentUser, authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldOK, setFieldOK] = useState(true);
    const [publish, setPublish] = useState(true);
    const [fileInfo, setFileInfo] = useState();
    const [imageFile, setImageFile] = useState();
    // Refs
    const titleRef = useRef()
    const contentRef = useRef()
    const priorityRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    // const imageRef = useRef()
    // const imageTextRef = useRef()

    const [feedPostData, setFeedPostData] = useState();
    const classes = useStyles();

    function HandleImageSelect(e) {
        setImageFile()
        const image = e.target.files[0]
        if (e.target.files[0]) {
            if (image && image.type == "image/jpeg" || image.type == "image/png") {
                setImageFile({ image: image, progress: null })
                const UploadTask = Storage.ref(`/Images/UserImages/${currentUser.uid}/ProfilePics/${image.name}`).put(image)
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
        return 
    }

    function HandleDataSubmit(e) {
        if (!contentRef.current.value && !titleRef.current.value) {
            setFieldOK(false);
            setError("Please enter the required fields");
        }
        try {
            setFeedPostData({
                visible: publish,
                user_id: currentUser.uid,
                createdAt: Firestore.serverTime(),
                priority: priorityRef.current.value,
                viewers: [],
                title: titleRef.current.value,
                author: { name: authUser.fName + " " + authUser.lName, image: authUser.image.uri },
                image: fileInfo ? fileInfo : { uri: 'https://source.unsplash.com/random' },
                content: contentRef.current.value,
                date: dateRef.current.value ? dateRef.current.value : null,
                time: timeRef.current.value ? timeRef.current.value : null,
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
            await Firestore.notifications.add(feedPostData)
            setError("");
            setLoading(false);
            history.push("/")
            return
        } catch (e) {
            setError("Error occurd, Your post is not created, please try later");
            console.log("ERROR", e.code)
            setError(e.code);
            setLoading(false);
            return
        }
    }
    return (
        <>
            <AppDrawer title={"Create Notification"} />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={0} sm={7} md={7} xl={7} className={classes.image} />
                <Grid item xs={12} sm={5} md={5} xl={5} component={Paper} elevation={6} square>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <EmailOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">New Notification</Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <form className={classes.form} noValidate onSubmit={HandleOnSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="postitle"
                                            required
                                            color="secondary"
                                            label="Title"
                                            inputRef={titleRef}
                                            error={!fieldOK}
                                            onChange={() => setFieldOK(true) || setError("")}
                                            helperText={!fieldOK ? "Required" : ''}
                                            name="notification title"
                                            autoComplete="notification title"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            color="secondary"
                                            id="Notification"
                                            label="Notification"
                                            inputRef={contentRef}
                                            error={!fieldOK}
                                            onChange={() => setFieldOK(true) || setError("")}
                                            helperText={!fieldOK ? "Required" : ''}
                                            name="notification content"
                                            autoComplete="notification content"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            color="secondary"
                                            id="prior"
                                            defaultValue={0}
                                            InputProps={{ inputProps: { min: 0, max: 4 } }}
                                            inputRef={priorityRef}
                                            // error={!fieldOK}
                                            // onChange={() => setFieldOK(true) || setError("")}
                                            helperText={"Priority"}
                                            name="number"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            color="secondary"
                                            id="dob"
                                            inputRef={dateRef}
                                            helperText={"Date"}
                                            name="dob"
                                            type="date"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            color="secondary"
                                            id="dob"
                                            inputRef={timeRef}
                                            helperText={"Time"}
                                            name="dob"
                                            type="time"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            minHeight="3.4rem">
                                            <div style={publish ? { color: "green" } : { color: "red" }}>
                                                Publish Notification
                                        </div>
                                            <Switch
                                                checked={publish}
                                                onChange={() => setPublish(!publish)}
                                                color="secondary"
                                                fullWidth
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button fullWidth disabled={imageFile && !imageFile.progress == 100} title={imageFile && imageFile.name} style={{ height: "50px" }} variant="outlined" component="label" >
                                            <><CameraAltOutlinedIcon />upload</>
                                            <input type="file" onChange={HandleImageSelect || setImageFile()} hidden /><CircularProgress variant="determinate"
                                                color="secondary"
                                                thickness="5" size="30px"
                                                style={{ padding: "30px 0px" }}
                                                value={imageFile && imageFile.progress} />
                                        </Button>
                                    </Grid>
                                    {imageFile && imageFile.progress == 100 ?
                                        <Alert severity="success"><div style={{ textOverflow: "ellipsis" }}>{imageFile && imageFile.image.name} Uploaded successfully
                                </div></Alert> : imageFile && !imageFile.progress == 0 ?
                                            <Alert severity="warning"><div style={{ textOverflow: "ellipsis" }}>{imageFile && imageFile.image.name} Uploading {imageFile && Math.floor(imageFile.progress)}%
                                </div></Alert>
                                            : ""
                                    }
                                </Grid>
                                <Button
                                    onClick={HandleDataSubmit}
                                    type="submit"
                                    fullWidth
                                    disabled={loading || error}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}>
                                    {loading ? "Please Wait" : "Create Notification"}
                                </Button>
                                <Grid container justify="flex-end">
                                </Grid>
                            </form>
                        </div>
                    </Container>
                <Copyright />
                </Grid>
            </Grid>
        </>
    );
}

