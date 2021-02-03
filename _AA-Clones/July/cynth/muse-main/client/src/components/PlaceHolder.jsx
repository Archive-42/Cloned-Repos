import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authentication';
import CreateCharacter from './CreateCharacter';


const PlaceHolder = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => dispatch(logout());
    
  
  
  
  return (
    <>
      {/* <h1>Protected Main Page</h1>
      <button onClick={handleClick} >Log Out</button> */}
      <CreateCharacter />
    </>
  )
};

export default PlaceHolder;