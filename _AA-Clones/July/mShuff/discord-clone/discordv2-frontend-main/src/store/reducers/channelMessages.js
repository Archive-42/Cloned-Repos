import { ADD_CHANNEL_MESSAGES, ADD_CHANNEL_MESSAGE } from "../actions/channelMessages";


export default function reducer(state = [], action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_CHANNEL_MESSAGES: {
            const { channelMessages } = action;
            return [ ...channelMessages ];
            // const channelMessages = action.channelMessages.map((channelMessage) => ({ [channelMessage.id]: channelMessage}));
            // return merge({}, ...channelMessages)
        }
        case ADD_CHANNEL_MESSAGE: {
            const { channelMessage } = action;

            return [...state, channelMessage];
            // const oldMessages = state[channelMessage.ChannelId]
            //     ? state[channelMessage.ChannelId]
            //     : [];
            // return merge({
            //     ...state,
            //     [channelMessage.channelId]: [...oldMessages, channelMessage]
            // });
            // return merge({}, state, action.channelMessage)
        }
        default:
            return state;
    }
}
