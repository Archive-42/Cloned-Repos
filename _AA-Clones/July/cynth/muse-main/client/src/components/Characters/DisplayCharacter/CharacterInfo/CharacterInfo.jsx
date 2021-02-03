import React from 'react';
import { useSelector } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';

import './character_info.css';
import infoFrame from './open_book.png';
import TraitRender from './TraitRender';

export default function CharacterInfo() {
  const { id: firstId, name: firstName } = useSelector((state) => state.createCharacters.firstName);
  const { id: lastId, name: lastName } = useSelector((state) => state.createCharacters.lastName);
  const { id: physId, name: physical } = useSelector((state) => state.createCharacters.physical);
  const { id: strId, name: strengths } = useSelector((state) => state.createCharacters.strengths);
  const { id: weakId, name: weaknesses } = useSelector((state) => state.createCharacters.weaknesses);
  const { id: motId, name: motivations } = useSelector((state) => state.createCharacters.motivations);
  const { id: secId, name: secrets } = useSelector((state) => state.createCharacters.secrets);
  const bio = useSelector(state => state.createCharacters.bio)

  
  return (
    <div style={{ backgroundImage: `url(${infoFrame})` }} className='info_display'>
      <div className="info_grid">
      
        <CSSTransition in={firstName} timeout={1000} classNames='first'>
          <TraitRender id={firstId} trait={firstName} classNames='first' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={lastName} timeout={1000} classNames='last'>
          <TraitRender id={lastId} trait={lastName} classNames='last' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={physical} timeout={1000} classNames='trait' >
          <TraitRender id={physId} trait={physical} classNames='trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={strengths} timeout={1000} classNames='trait'>
          <TraitRender id={strId} trait={strengths} classNames='trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={weaknesses} timeout={1000} classNames='trait'>
          <TraitRender id={weakId} trait={weaknesses} classNames='trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={motivations} timeout={1000} classNames='trait'>
          <TraitRender id={motId} trait={motivations} classNames='trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={secrets} timeout={1000} classNames='trait'>
          <TraitRender id={secId} trait={secrets} classNames='trait' timeout={1000} />
        </CSSTransition>
        
        <p className="bio">{bio}</p>
        
      </div>
    </div>
  );
}
