import { Typography, Container, Link, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    copyright: {
        fontWeight: "normal",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
            textDecoration: "none",
            transition: "1s ease-out",
        },
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));

export default function Copyright({ description, title }) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                {/* <Typography variant="h6" align="center" gutterBottom>
                    ©Club De OSCAR
                </Typography> */}
                <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
                    Club De OSCAR
                </Typography>
                <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
                    {'© '}{new Date().getFullYear()}{' Club de Oscar, All Rights Reserved. Created By '}
                    <Link color="inherit" href="https://github.com/ManHereIsCrazy/">
                        #Ab_s
                    </Link>
                </Typography>
            </Container>
        </footer>
    );
}

// © 2021 Sephora USA, Inc. All rights reserved