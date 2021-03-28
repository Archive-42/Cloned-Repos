import React from 'react';
// import CSSTransition from 'react-transition-group/CSSTransition';

import './character_card.css';
// import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';
import CharacterInfo from './CharacterInfo';



export default function CharacterCardBody(props) {
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: getUrl(props.imageUrl) }} 
    >
        
      <div className="character_card_space"></div>
        
      <CharacterInfo props={props} />
      
    </div>
  )
}


