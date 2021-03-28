import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinServer } from '../store/actions/server';
import './stylesheets/AddServer.css';

function JoinServer({ handleClose, socket }) {
  const dispatch = useDispatch();
  const [serverId, setServerId] = useState('');

  const handleServerJoin = (event) => {
    event.preventDefault();
    if (serverId.length > 0) {
      dispatch(joinServer(serverId, socket));
    }
    handleClose();
  };

  const updateServerId = (event) => {
    setServerId(event.target.value);
  };

  return (
    <div className="serverForm">
      <h1>Join A Server!</h1>
      <form onSubmit={ handleServerJoin }>
        <input onChange={ updateServerId } value={ serverId } placeholder="Enter Server ID" type="text" />
        <button type="submit">Join Server</button>
      </form>
    </div>
  );
}

export default JoinServer;
