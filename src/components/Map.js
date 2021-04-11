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
  
    return (
        <div>
          MAP COMPONENT
        </div>
    )
}

export default Map;