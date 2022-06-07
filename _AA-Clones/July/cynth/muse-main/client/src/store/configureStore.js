import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authentication from './authentication';
import api from './middleware/api';
import traits from './reducer/traits';
import allCharacters from './reducer/allCharacters';
import modifyCharacter from './reducer/modifyCharacter';
import createCharacters from './reducer/createCharacters';
import utilities from './reducer/utilites';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  // TODO: Add Reducers here
  authentication,
  allCharacters,
  modifyCharacter,
  traits,
  createCharacters,
  utilities,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication', 'createCharacters'],
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default function createPersistentStore() {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, api)));
  const persistor = persistStore(store);
  return { store, persistor }
}
