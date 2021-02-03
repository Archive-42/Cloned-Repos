import { ADD_CHANNEL, ADD_CHANNELS, ADD_JOINED_CHANNEL, SET_CURRENT_CHANNEL } from "../actions/channel";
import merge from "lodash/merge";

const initialState = {
    channels: [],
    currentChannel: {},
    joinedChannels: [],
};

export default function reducer(state = initialState, action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_CHANNEL:
            const newState = { ...state };
            const channels = { ...newState, channels: [...newState.channels, action.channel] };
            return channels;
        case ADD_CHANNELS:
            return merge({},  { channels: action.channels, currentChannel: state.currentChannel, joinedChannels: state.joinedChannels });
        case SET_CURRENT_CHANNEL:
            return merge({ ...state, currentChannel: action.channel } );
        case ADD_JOINED_CHANNEL:
            return merge({ ...state, joinedChannels: [...state.joinedChannels, action.channel]});
        default:
            return state;
    }
}
