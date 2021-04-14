import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Box, Typography, Container } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import logonamR from '../../assets/img/logo-namR-2021.svg';
import { LOGIN_MAIL_ADDRESS, LOGIN_PASSWORD } from '../../consts/consts';
import PropTypes from 'prop-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/AmmarBourghoud/namR" target="_blank">
        abourgho
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: 'white',
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      }
  },
 },
}));

/** 
    * Login component gets the token state's methode from parent component * 
    * Has three local states : *
    * mail : to check the mail through checkCreditentials function *
    * password : to check the password through checkCreditentials function *
    * isError : to alert the user through showAlert function *
**/ 
export default function Login({ setToken }) {
  const classes = useStyles();
  
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  
  /** 
    * checkCreditentials function * 
    * Check the mail/password entred by user to either updates the token's state or show alert *
  **/   
  const checkCreditentials = (e) => {
    e.preventDefault();
    const token = {
      mail,
      password
    };
    (mail === LOGIN_MAIL_ADDRESS && password === LOGIN_PASSWORD) ? 
        setToken(token) : 
        setIsError(true)
  }

  /** 
    * showAlert function * 
    * Show an alert on wrong user entries *
  **/ 
  function showAlert() { 
    return( 
      <div className={classes.alert}>
        <Alert variant="filled" severity="error" onClose={() => setIsError(false)}>
            Mot de passe ou adresse mail invalide !
        </Alert>
      </div>
    );
  }

  /** 
    * Returns the form and calls the right functions to update states * 
  **/ 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
          { isError && showAlert() }
          <Avatar className={classes.avatar} alt="namR logo" src={logonamR} />
          <form className={classes.form} noValidate onSubmit={checkCreditentials}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address : admin@admin.com"
              name="email"
              autoComplete="email" 
              autoFocus
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password : admin"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            Se connecter
           </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}