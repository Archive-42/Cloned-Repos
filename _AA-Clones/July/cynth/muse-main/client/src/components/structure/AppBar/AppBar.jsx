import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './app_bar.css';
import { logout } from '../../../store/authentication';
import { toggleDrawer } from '../../../store/actions/utilities';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


export default function AppBar() {
  const { avatarUrl, username } = useSelector(state => state.authentication.user);
  const drawerOpen = useSelector(state => state.utilities.drawerOpen);
  const dispatch = useDispatch();
  
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer(!drawerOpen));
  }
  
  const handleLogOut = () => {
    dispatch(logout())
  };
  
  return (
    <div className="app-bar">
      
      <div className="app-bar__left">
        
        <div className="drawer-button-wrapper">
          <IconButton 
            edge="start" 
            className='drawer-button'
            color='secondary'
            onClick={handleDrawerToggle}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </div>
        
        <Link className="title" to='/' >Muse</Link>
        
      </div>
      
      <div className="app-bar__right">
        <Button 
          variant="contained"
          disableElevation
          size='small' 
          color="secondary" 
          onClick={handleLogOut}
        >
          Log Out
        </Button>
        {
          avatarUrl 
            ? <Avatar alt='user avatar' src={avatarUrl} className='avatar' />
            : <Avatar className='default-avatar' >{username[0]}</Avatar>
        }
      </div>
      
    </div>
  )
}