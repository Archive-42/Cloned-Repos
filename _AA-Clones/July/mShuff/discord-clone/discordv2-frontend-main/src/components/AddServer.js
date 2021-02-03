import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createServer } from '../store/actions/server';
import './stylesheets/AddServer.css';

function AddServer({ handleClose, socket }) {
  const dispatch = useDispatch();
  const [serverTitle, setServerTitle] = useState('');

  const handleServerCreate = (event) => {
    event.preventDefault();
    dispatch(createServer(serverTitle, socket));
    handleClose();
  };

  const updateServerTitle = (event) => {
    setServerTitle(event.target.value);
  };

  return (
    <div className="serverForm">
      <h1>Create A Server</h1>
      <form onSubmit={ handleServerCreate }>
        <input onChange={ updateServerTitle } value={ serverTitle } placeholder="Server Title" type="text" />
        <button type="submit">Create Server</button>
      </form>
    </div>
  );
}

export default AddServer;
