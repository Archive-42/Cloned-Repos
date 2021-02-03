import { baseUrl } from "../../config";
export const ADD_CHANNELS = "discord/server/ADD_CHANNELS";
export const ADD_CHANNEL = "discord/server/ADD_CHANNEL";
export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const ADD_JOINED_CHANNEL = "ADD_JOINED_CHANNEL";

export const addChannels = (channels) => ({ type: ADD_CHANNELS, channels });
export const addChannel = (channel) => ({ type: ADD_CHANNEL, channel });
export const setCurrentChannel = (channel) => ({ type: SET_CURRENT_CHANNEL, channel });
export const addJoinedChannel = (channel) => ({ type: ADD_JOINED_CHANNEL, channel });


export const getChannels = (serverId) => async (dispatch) => {
    if (!serverId) return;
    const response = await fetch(`${baseUrl}/channels/${serverId}`);
    if (response.ok) {
        const { channels } = await response.json();
        dispatch(addChannels(channels));
    }
};

export const createChannel = (title, serverId, socket, topic) => async (dispatch) => {
    if (!title || !serverId) return;
    if (!topic) {
        topic = '';
    }
    // console.log('YO')
    const response = await fetch(`${baseUrl}/channels`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, topic, serverId }),
    });



    if (response.ok) {
        const channel = await response.json();
        dispatch(addChannel(channel));
        socket.emit('addChannelListener', channel);
    }
};
