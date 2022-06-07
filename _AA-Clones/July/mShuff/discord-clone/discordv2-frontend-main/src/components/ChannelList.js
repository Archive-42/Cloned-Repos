import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/ChannelList.css';
import { setCurrentChannel, getChannels } from '../store/actions/channel';
import { Avatar, Popover } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddChannel from './AddChannel';
// import { NavLink } from 'react-router-dom';

function ChannelList({ socket, serverId }) {
  const channels = useSelector((state) => state.channel.channels);
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const channelArray = Object.values(channels);
  const dispatch = useDispatch();
  const [showChannel, setShowChannel] = useState(false);

  useEffect(() => {
    dispatch(getChannels(serverId));
  }, [dispatch, serverId]);

  // When someone clicks the channel button,
  // set the current Channel in Redux
  const joinChannel = async (channel) => {
    if (channel.id === currentChannel.id) return;
    dispatch(setCurrentChannel(channel));
  };

  const showChannelForm = () => setShowChannel(!showChannel);
  return (
    <div className="channelList border-gradient margin-fix">
      <Avatar onClick={ showChannelForm } className="channelList__addButton" >
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
        open={ showChannel }
        onClose={ () => setShowChannel(!showChannel) }
      >
        <AddChannel handleClose={ showChannelForm } socket={ socket } />
      </Popover>

      {channelArray.map((channel, idx) => {
        return (
          <div key={ Math.random() * 1000 }>
            {channel.id === currentChannel.id ? (
              <div
                className="channelList__div currentChannel"
                key={ idx }
                onClick={ () => joinChannel(channel) }
              >
                <span key={ Math.random() * 1000 } className="channelList__hash">
                  #
                </span>
                <span
                  key={ Math.random() * 1000 }
                  className="channelList__channel"
                >
                  { channel.title }
                </span>
              </div>
            ) : (
                <div
                  className="channelList__div"
                  key={ idx }
                  onClick={ () => joinChannel(channel) }
                >
                  <span key={ Math.random() * 1000 } className="channelList__hash">
                    #
                </span>
                  <span
                    key={ Math.random() * 1000 }
                    className="channelList__channel"
                  >
                    { channel.title }
                  </span>
                </div>
              ) }
          </div>
        );
      }) }
    </div>
  );
}

/*

          <NavLink key={idx} className='channelList__div' activeClassName="is-selected" to={`/channels/${channel.id}`} onClick={() => joinChannel(channel)}>
            <span key={idx} className='channelList__hash'>#</span>
            <span key={idx} className='channelList__channel'>{channel.title}</span>
          </NavLink>*/

export default ChannelList;
