import React from "react";
import { AppBar, Container, Toolbar, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
      bottom: '0',
      marginTop: '60%',
    }, 
  }));

function Map() {
    const classes = useStyles();
    console.log("toz");
    return (
        <footer>
        <AppBar position="sticky" className={classes.footer} color="white">
          <Container maxWidth="md">
            <Toolbar>
                <Typography variant="caption" color="textSecondary" align="left" >
                <Link color="blue" href="https://github.com/AmmarBourghoud/namR" target="_blank">
                     abourgho
                </Link>{' '}
                     {new Date().getFullYear()}
                       {'.'}
                </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        </footer>
    )
}

export default Map;