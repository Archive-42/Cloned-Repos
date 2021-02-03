import React from 'react';

import './character_card.css';
// import Fade from '@material-ui/core/Fade';



export default function CharacterCardHeader(props) {
  const firstName = props.firstName?.name;
  const lastName = props.lastName?.name;
  
  
  return (
    <div className="character_card_header" >
      <div className="card_header_name_wrapper">
        
        {/* <Fade in={firstName} timeout={{ enter: 300, exit: 300 }} > */}
          <div className="card_first">{firstName}</div>
        {/* </Fade> */}
      
        {/* <Fade in={firstName} timeout={{ enter: 300, exit: 300 }} > */}
          <div className="card_last">{lastName}</div>
        {/* </Fade> */}
      
      </div>
    </div>
  )
}
