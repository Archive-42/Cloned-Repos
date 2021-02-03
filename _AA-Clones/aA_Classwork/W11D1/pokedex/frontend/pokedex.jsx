import React from 'react';
import ReactDOM from 'react-dom';
import { receiveAllPokemon , requestAllPokemon }from "./actions/pokemon_actions";
import { fetchAllPokemon }from "./util/api_util"; 
import configureStore from "./store/store";
import { selectAllPokemon } from "./reducers/selectors";
import Root from './components/root';
import { HashRouter, Route } from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore()
  const rootEl = document.getElementById('root');

  window.receiveAllPokemon = receiveAllPokemon;
  window.fetchAllPokemon = fetchAllPokemon;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.requestAllPokemon = requestAllPokemon;
  window.selectAllPokemon = selectAllPokemon;

  ReactDOM.render(<Root store={store}/>, rootEl);
});
