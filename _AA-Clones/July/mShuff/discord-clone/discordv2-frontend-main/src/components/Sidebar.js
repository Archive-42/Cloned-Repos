import { Avatar, Button, Tooltip } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Sidebar.css';
import { getChannels } from '../store/actions/channel';
import AddServer from './AddServer';
import { setCurrentServer } from '../store/actions/server';
import JoinServer from './JoinServer';

function Sidebar({ socket }) {
  const [showServer, setShowServer] = useState(false);
  const [showChannel, setShowChannel] = useState(false);
  const [joinServerForm, setJoinServerForm] = useState(false);
  const servers = useSelector((state) => Object.values(state.server.servers));
  const dispatch = useDispatch();

  const showJoinServer = () => setJoinServerForm(!joinServerForm);
  const showServerForm = () => setShowServer(!showServer); // For creating a server

  const showChannels = async (serverId) => {
    setShowChannel(!showChannel);
    dispatch(getChannels(serverId));
    dispatch(setCurrentServer(serverId));
  };

  if (!servers) return;
  return (
    <div className="sidebar gradient-2">
      <Button
        variant="outlined"
        color="primary"
        onClick={ showJoinServer }
        id="sidebarJoinServer__button"
      >
        Join A Server
      </Button>
      <Popover
        anchorOrigin={ {
          vertical: 'center',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'center',
          horizontal: 'center',
        } }
        open={ joinServerForm }
        onClose={ () => showJoinServer() }
      >
        <JoinServer handleClose={ showJoinServer } socket={ socket } />
      </Popover>

      {servers.map((server, index) => {
        if (!server) return;
        return (
          <Tooltip key={ Math.random() * 100 } title={ server.title } placement="right">
            <Avatar
              key={ Math.random() * 100 }
              id={ server.id }
              alt={ server.title }
              onClick={ () => {
                if (!server.id) {
                  return;
                } else {
                  showChannels(server.id);
                }
              } }
              className="sidebar__serverBtn"
            >{ server.title[0] } </Avatar>
          </Tooltip>
        );
      }) }
      <Avatar onClick={ showServerForm } className="sidebar__addButton">
        <AddIcon />
      </Avatar>
      <Popover
        anchorOrigin={ {
          vertical: 'center',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'center',
          horizontal: 'center',
        } }
        open={ showServer }
        onClose={ () => setShowServer(!showServer) }
      >
        <AddServer handleClose={ showServerForm } socket={ socket } />
      </Popover>
    </div>
  );
}

export default Sidebar;
