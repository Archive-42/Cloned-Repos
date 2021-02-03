import React from 'react';

import './character_card.css';

export default function CharacterTraits(props) {
  
  // console.log('PROPS: ', props)
  
  return (
    <div className="character_traits">
      
      <div className="card_trait">
          <div className="card_trait_type">
            Identifier: 
          </div>
        
          <div className="card_trait_name">
            {props.props.physical?.name}
          </div>
        </div>
        
        <div className="card_trait">
          <div className="card_trait_type">
            Virtue: 
          </div>
        
          <div className="card_trait_name">
            {props.props.strengths?.name}
          </div>
        </div>
        
        <div className="card_trait">
          <div className="card_trait_type">
            Flaw: 
          </div>
        
          <div className="card_trait_name">
            {props.props.weaknesses?.name}
          </div>
        </div>
        
        <div className="card_trait">
          <div className="card_trait_type">
            Motivation: 
          </div>
        
          <div className="card_trait_name">
            {props.props.motivations?.name}
          </div>
        </div>
        
        <div className="card_trait">
          <div className="card_trait_type">
            Secret: 
          </div>
        
          <div className="card_trait_name">
            {props.props.secrets?.name}
          </div>
        </div>
      
    </div>
  )
}