import React from 'react';

import './characters.css';
import ModifyForm from './CharacterForm/ModifyForm';
import ModifyDisplay from './ModifyDisplay/ModifyDisplay';


export default function CreateCharacter() {
  
  return (
    <div className="modify-character">
      
      <div className="modify-character_form">
        <ModifyForm />
      </div>
      
      <div className="modify-character_display">
        <ModifyDisplay />
      </div>
      
    </div>
  )
}
