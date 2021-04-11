import React from "react";
import { AppBar, Container, Toolbar, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
      bottom: '0',
      marginTop: '60%',
    }, 
  }));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer>
        <AppBar position="sticky" className={classes.footer} color="transparent">
          <Container maxWidth="md">
            <Toolbar>
                <Typography variant="caption" color="textSecondary" align="left" >
                <Link color="primary" href="https://github.com/AmmarBourghoud/namR" target="_blank">
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
