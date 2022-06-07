import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root_reducer';
import {logger} from 'redux-logger';
import thunkMiddleware from "../middleware/thunk"

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer, 
    preloadedState,
    applyMiddleware(thunkMiddleware, logger)
    );
};

export default configureStore;