import { baseUrl } from "../../config"
export const ADD_CHANNEL_MESSAGES= "discord/server/ADD_CHANNEL_MESSAGES"
export const ADD_CHANNEL_MESSAGE = "discord/server/ADD_CHANNEL_MESSAGE"

export const addChannelMessages =(channelMessages, channelId) => ({ type: ADD_CHANNEL_MESSAGES, channelMessages, channelId })
export const addChannelMessage = (channelMessage) => ({ type: ADD_CHANNEL_MESSAGE, channelMessage})

export const getChannelMessages = (channelId) => async (dispatch) => {
    if (!channelId) return;
    const response = await fetch(`${baseUrl}/channels/${channelId}/messages`)

    if (response.ok) {
        const { channelMessages } = await response.json();
        dispatch(addChannelMessages(channelMessages, channelId));
    }
}
