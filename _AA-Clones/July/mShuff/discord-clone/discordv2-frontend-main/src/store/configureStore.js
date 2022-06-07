import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import authentication from './reducers/authentication';
import server from './reducers/server';
import channel from './reducers/channel';
import channelMessages from './reducers/channelMessages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  server,
  channel,
  channelMessages
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
