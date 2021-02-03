import React from 'react';
import CharacterForm from './CharacterForm/CharacterForm';

import './characters.css';
import CharacterCard from './CharacterCard/CharacterCard';


export default function CreateCharacter() {
  
  
  
  return (
    <div className="create-character">
      
      <div className="create-character_form">
        <CharacterForm />
      </div>
      
      <div className="create-character_display">
        <CharacterCard />
      </div>
      
    </div>
  )
}
