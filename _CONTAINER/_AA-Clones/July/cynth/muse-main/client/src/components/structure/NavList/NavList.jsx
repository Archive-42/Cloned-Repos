import React from 'react';
import './nav_list.css';


export default function NavList(props) {
  
  
  return (
    <div className="nav_wrapper">
      <div className="list_item">{props.title}</div>
    </div>
  )
}