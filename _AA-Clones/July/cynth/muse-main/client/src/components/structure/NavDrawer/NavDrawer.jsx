import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './nav_drawer.css';




export default function NavDrawer() {
  const drawerOpen = useSelector(state => state.utilities.drawerOpen);
  
  useEffect(() => {}, [drawerOpen]);
  
  return (
    <div className={drawerOpen ? 'nav-drawer open' : 'nav-drawer'}>
      
      <NavLink 
      to='/create-character' 
      className='nav-link'
      activeClassName='active' 
      >
        Create Character
      </NavLink>
      
      <NavLink 
      to='/modify-character' 
      className='nav-link'
      activeClassName='active' 
      >
        Modify Character
      </NavLink>
      
      
    </div>
  )
}