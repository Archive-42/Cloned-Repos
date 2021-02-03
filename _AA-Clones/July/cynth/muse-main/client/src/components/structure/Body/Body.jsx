import React from 'react';

import './body.css'
import NavDrawer from '../NavDrawer/NavDrawer';
import Main from '../Main/Main';
// import Footer from '../Footer/Footer';

export default function Body() {
  
  
  return (
    <div className="body">
              
      <div className="nav-drawer-wrapper">
        <NavDrawer />
      </div>   
      
      <div className="main-wrapper">
        <Main />  
      </div>
      
      
    </div>
  )
}