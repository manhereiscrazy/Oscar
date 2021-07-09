import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../Authentication';
import { useHistory, Redirect } from 'react-router-dom';
import { Firebase, Firestore, Storage } from '../firebase';

import { CssBaseline, Link, Paper, Divider, FormControl, FormControlLabel, InputLabel, Select, MenuItem, TextField, Checkbox, Grid, Box, Container, LinearProgress, CircularProgress, Slide, Avatar, Button, Typography } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import PopUpMessage from '../DataProcess/copyright'
import Copyright from '../DataProcess/copyright';


const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    UploadBtn: {
        "&:hover": {
            color: "red",
        },
        cursor: "pointer",
    },
    formControl: {
        //   margin: theme.spacing(1),
        minWidth: "100%",
    },
    root: {
        marginTop: "-65px",
        // minWidth: "100%",
    },
}));

const BGroups = ["A+", "A-", "B+", "B-", "O+", "O-"]


export default function CompleteRegistration() {
    const [userData, setUserData] = useState();
    const { SignUp, currentUser, authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageFile, setImageFile] = useState();
    const [fileInfo, setFileInfo] = useState();
    const [bGroup, setBGroup] = useState("");

    const classes = useStyles();
    const history = useHistory();

    const fnameRef = useRef();
    const lnameRef = useRef();
    const nnameRef = useRef();
    const dobRef = useRef();
    const bGroupRef = useRef();
    const phoneRef = useRef();
    const Address1Ref = useRef();
    const Address2Ref = useRef();
    const pincodeRef = useRef();
    const townRef = useRef();

    // states
    const [fieldOK, setFieldOK] = useState(true);

    function HandleImageSelect(e) {
        setImageFile()
        const image = e.target.files[0]
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

    function HandleDataSubmit(e) {
        if (!fnameRef.current.value || !lnameRef.current.value || !pincodeRef.current.value || !bGroup || !phoneRef.current.value) {
            setError("The Highlighted fields are required!");
            setFieldOK(false);
            return
        }
        try {
            setUserData({
                is_admin: false,
                is_active: true,
                is_member: true,
                user_id: currentUser.uid,
                Email: currentUser.email,
                image: fileInfo ? fileInfo : { uri: 'https://source.unsplash.com/random' },
                fName: fnameRef.current.value, //required
                lName: lnameRef.current.value, //required
                dofb: dobRef.current.value, //required
                pincode: pincodeRef.current.value, //required
                phone: phoneRef.current.value, //required
                bGroup: bGroup, //required
                nName: nnameRef.current.value ? nnameRef.current.value : null,
                address1: Address1Ref.current.value ? Address1Ref.current.value : null,
                address2: Address2Ref.current.value ? Address2Ref.current.value : null,
                town: townRef.current.value ? townRef.current.value : null,
            });
            setFieldOK(true);
            setError("");
            console.log("USERDATA: ", userData)
        }
        catch (e) {
            setFieldOK(false);
            setError("Enter the required fields",e);
        }

    }
    async function HandleOnSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            console.log("USERDATA: ",userData)
            await Firestore.auth_users.doc(currentUser.uid).set(userData)
            setError("");
            setLoading(false);
            history.push("/")
            return
        } catch (e) {
            setError("Error occurd could'nt update, please update after Login");
            setError("");
            setLoading(false);
            return
        }
    }

    return (
        !authUser ? 
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={7} md={7} className={classes.image} />
            <Grid item xs={12} sm={5} md={5} square>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <label className="btn btn-outline-success btn-sm m-0 mr-2">
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <input
                                type="file"
                                onChange={HandleImageSelect}
                                style={{ opacity: 0, position: "absolute", left: "-9999px" }}
                            />
                        </label>

                        <Typography component="h1" variant="h5">
                            Hey {currentUser?.email}, Complete Your Registration
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form className={classes.form} onSubmit={HandleOnSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        inputRef={fnameRef}
                                        id="firstName"
                                        label="First Name"
                                        // onFocus={()=>onTypeHandle}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        autoFocus
                                        helperText={!fieldOK ? "*required" : ""}
                                        error={!fieldOK}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        inputRef={lnameRef}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="lastName"
                                        autoComplete="lname"
                                        error={!fieldOK}
                                        helperText={!fieldOK ? "*required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="nick name"
                                        // required
                                        name="nickname"
                                        variant="outlined"
                                        fullWidth
                                        inputRef={nnameRef}
                                        id="nickname"
                                        label="Nick Name"
                                        // error={!fieldOK}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        // helperText={!fieldOK ? "*required" : ""}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Mobile Number"
                                        inputRef={phoneRef}
                                        placeholder="eg: 9447959698"
                                        name="phone"
                                        onChange={() => setFieldOK(true) || setError("")}
                                        type="tel"
                                        inputProps={{
                                            maxLength: 13,
                                            pattern: "[0-9]{10}"
                                        }}
                                        autoComplete="tel"
                                        error={!fieldOK}
                                        helperText={!fieldOK ? "*required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                                        <Select
                                            style={{ textAlign: "center" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={bGroup}
                                            inputRef={bGroupRef}
                                            onChange={(e) => {setBGroup(e.target.value)}}
                                        >
                                            {
                                                BGroups.map((BGRP, i) =>
                                                    <MenuItem  key={i} value={BGRP}>
                                                            {BGRP}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="dob"
                                        inputRef={dobRef}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="dob"
                                        type="date"
                                        error={!fieldOK}
                                        helperText={!fieldOK ? "*required" : "Date of birth"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        // required
                                        fullWidth
                                        id="Addr1"
                                        label="Address line1"
                                        inputRef={Address1Ref}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="address"
                                        autoComplete="Address"
                                    // error={!fieldOK}
                                    // helperText={!fieldOK ? "*required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        // required
                                        fullWidth
                                        id="Addr1"
                                        label="Address line 2"
                                        inputRef={Address2Ref}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="address"
                                        autoComplete="Address"
                                    // error={!fieldOK}
                                    // helperText={!fieldOK ? "*required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        // required
                                        fullWidth
                                        id="twn"
                                        label="Town"
                                        inputRef={townRef}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="townname"
                                        autoComplete="Town"
                                    // error={!fieldOK}
                                    // helperText={!fieldOK ? "*required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ appearance: "none" }}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="pincode"
                                        label="Pincode"
                                        placeholder="eg: 123456"
                                        inputRef={pincodeRef}
                                        onChange={() => setFieldOK(true) || setError("")}
                                        name="Pincode"
                                        type="tel"
                                        inputProps={{
                                            maxLength: 6,
                                            pattern: "[0-9]{6}"
                                        }}
                                        autoComplete="Pincode"
                                        error={!fieldOK}
                                        helperText={!fieldOK ? "*required" : ""}
                                    />
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
                                type="submit"
                                fullWidth
                                disabled={loading || !fieldOK}
                                onClick={HandleDataSubmit}
                                variant="contained"
                                color="secondary"
                                className={classes.submit}>
                                {loading ? "Please Wait" : !fieldOK ? "Please Correct The Errors" : "Continue"}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link
                                        color="secondary" href="/login" variant="body2">
                                        Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                    </Box>
                </Container>
                <Copyright />
            </Grid>
        </Grid> 
        : 
        <Redirect to="/" />
    );
}