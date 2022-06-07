import React from 'react';
import './display_character.css';
import imageFrame from "./image_frame.png";
import portal from './portal2.jpg';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import { useSelector } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';


export default function DisplayCharacter() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl)
  
  
  return (
    <div className="display_character">
      <div className='image_wrapper'>
        <div className="default_background" style={{ backgroundImage: `url(${portal})` }}>
        
        <CSSTransition 
          in={imageUrl}
          timeout={2000}
          classNames='character_image_box'
        >
          <img src={imageUrl} className='character_image_box' alt='character' />
        </CSSTransition>  
        
        <img 
          src={imageFrame}
          className='character_image'
          alt="frame" />
        </div>
      </div>
      
      
      <div className="character_info_wrapper">
        <CharacterInfo />
      </div>
    </div>
  )
}