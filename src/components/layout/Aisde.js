import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemIcon, Paper, Drawer, AppBar, Toolbar, List, CssBaseline, Divider, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import logoOds from '../../assets/img/ods.png';
import TableChartIcon from '@material-ui/icons/TableChart';
import RoomIcon from '@material-ui/icons/Room';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import MapRoundedIcon from '@material-ui/icons/MapRounded';

/** 
  * Styles for the Aside Component *
**/
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: 'black',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

/** 
  * Aside Component takes the setChoice function to switch views and the child Component to be rendred *
**/
export default function Aside({ setChoice, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Paper variant="outlined" style={{ border: '0' }}>
                <img alt="log ods" style={{ width: '50%' }} src={logoOds} />
            </Paper>  
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />

      {/** 
        * ListItem to choose the view *
        * Updates the choice by updating the prop's state using setChoice function *
        * Renders the children component passed by props depending on choice *
      **/}
      <List> 
        <ListItem button onClick={() => setChoice('list')}> 
            <ListItemIcon>
                <TableChartIcon />      
            </ListItemIcon>
            <ListItemText primary="List view" />
        </ListItem>  
        <ListItem button onClick={() => setChoice('clustermap')}>    
            <ListItemIcon>
                <MapOutlinedIcon />        
            </ListItemIcon>
            <ListItemText primary="Clustermap view" />
        </ListItem>
         <ListItem button onClick={() => setChoice('markupsmap')}>
            <ListItemIcon>
                <RoomIcon />      
            </ListItemIcon>
            <ListItemText primary="Markupsmap view" />
        </ListItem>  
        <ListItem button onClick={() => setChoice('heatmap')}> 
            <ListItemIcon>
                 <MapRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Heatmap view" />
        </ListItem>  
      </List>
      </Drawer>
      {children}
    </div>
  );
}
