import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from '../store/actions/channel';
import './stylesheets/AddServer.css';

function AddChannel({ handleClose, socket }) {
  const dispatch = useDispatch();
  const currentServerId = useSelector(state => state.server.currentServer);
  const [channelTitle, setChannelTitle] = useState(''); // Channel title state
  const [channelTopic, setChannelTopic] = useState(''); // Channel topic state


  const handleChannelCreate = (event) => {
    if (!currentServerId) {
      window.alert('Please pick a valid server to create a channel for!');
    }
    event.preventDefault();
    dispatch(createChannel(channelTitle, currentServerId, socket, channelTopic));
    handleClose();
  };

  const updateChannelTitle = (event) => {
    setChannelTitle(event.target.value);
  };
  const updateChannelTopic = (event) => {
    setChannelTopic(event.target.value);
  };

  return (
    <div className="serverForm">
      <h1>Create A Channel!</h1>
      <form onSubmit={ handleChannelCreate }>
        <input onChange={ updateChannelTitle } value={ channelTitle } placeholder="Channel Title" type="text" />
        <input onChange={ updateChannelTopic } value={ channelTopic } placeholder="Channel Topic" type="text" />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
}

export default AddChannel;
