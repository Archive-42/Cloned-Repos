import React, { useEffect } from 'react';
import CharacterInfo from './CharacterInfo';

import './character_card.css';
import { useSelector } from 'react-redux';



export default function ModifyCardBody(props) {
  const modCharacter = useSelector(state => state.modifyCharacter);
  const traits = useSelector(state => state.traits);
  
  useEffect(() => {}, [modCharacter]);
  
  const getCharacterInfo = traitType => {
    return (
      props.id === modCharacter.id 
        ? traits[traitType][modCharacter.traits[traitType]]
        : traits[traitType][props[traitType]] 
    )
  }
  
  const characterInfo = {
    physical: getCharacterInfo('physical'),  
    strengths: getCharacterInfo('strengths'), 
    weaknesses: getCharacterInfo('weaknesses'),
    motivations: getCharacterInfo('motivations'),
    secrets: getCharacterInfo('secrets'),   
    bio: props.id === modCharacter.id  ?  modCharacter.bio  :  props.bio,
  }
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => {
    if(props.id === modCharacter.id) {
      return modCharacter.imageUrl ? `url(${modCharacter.imageUrl})` : `none`;
    } 
    else {
      return url  ?  `url(${url})`  :  'none';
    }
  }
  
  
  
  return (
    <div className="modify_card_body" style={{ backgroundImage: getUrl(props.imageUrl) }}  >
      
      <div className="modify_card_space"></div>
        
      <CharacterInfo props={characterInfo} />
      
    </div>
  )
}
