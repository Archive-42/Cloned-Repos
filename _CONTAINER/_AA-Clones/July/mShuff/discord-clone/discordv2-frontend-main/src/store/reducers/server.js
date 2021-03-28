import { JOIN_SERVER, LOAD_SERVER, ADD_SERVER, SET_CURRENT_SERVER } from "../actions/server";
// import merge from "lodash/merge";

const initialState = {
    servers: {},
    currentServer: '',
}

export default function reducer(state = initialState, action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_SERVER: {
            return {
                ...state, servers: {
                    ...state.servers,
                    [action.server.id]: action.server,
                }
            }
        }
        // case ADD_SERVERS: {
        //     const servers = action.servers.map((server) => ({ [server.id]: server}));
        //     return merge({}, state, ...servers)
        // }

        case JOIN_SERVER: {

            return {
                ...state, servers: {
                    ...state.servers,
                    [Object.keys(state.servers).length + 1]: action.server,
                }
            }
        }

        case LOAD_SERVER: {
            return { servers: { ...action.list } };
        }

        case SET_CURRENT_SERVER: {
            return { ...state, currentServer: action.serverId }
        }

        default:
            return state;
    }
}
