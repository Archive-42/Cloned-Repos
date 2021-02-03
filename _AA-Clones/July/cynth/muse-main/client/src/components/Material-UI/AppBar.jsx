import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { logout } from '../../store/authentication';
import { toggleDrawer } from '../../store/actions/utilities';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    'MuiToolbar-gutters': {
      padding: 0,
    },
  },
  appBar: {
    
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  navGrid: {
    maxWidth: 1240,
    margin: '0 auto',
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  title: {
    flexGrow: 1,
    fontFamily: `'Sonsie One', cursive`,
    fontSize: '25px',
    color: theme.palette.secondary.main,
  },
  
  darkBlue: {
    backgroundColor: '#4a148c',
    color: 'white',
  }
}));

export default function MenuAppBar() {
  const token = useSelector(state => state.authentication.token)
  const drawerOpen = useSelector(state => state.utilities.drawerOpen)
  const { avatarUrl, username } = useSelector(state => state.authentication.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    dispatch(logout())
    return <Redirect to='/' />
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer(!drawerOpen))
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Grid container className={classes.navGrid}>
          <Grid item xs={12}>
        
            <Toolbar variant='dense' >
            
              <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                onClick={handleDrawerToggle}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Muse
              </Typography>
              {token && (
                <div>
                  <Button 
                    variant="contained"
                    disableElevation
                    size='small' 
                    color="secondary" 
                    onClick={handleLogOut}>
                    Log Out
                  </Button>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {avatarUrl 
                      ? <Avatar alt='user avatar' src={avatarUrl} />
                      : <Avatar className={classes.darkBlue}>{username[0]}</Avatar>
                    }
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
              
            </Toolbar>
            
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}