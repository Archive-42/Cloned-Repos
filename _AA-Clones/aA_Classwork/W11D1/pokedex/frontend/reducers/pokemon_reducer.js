import { RECEIVE_ALL_POKEMON } from "../actions/pokemon_actions";

export const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type){
    case RECEIVE_ALL_POKEMON:
      return action.payload;

    default:
      return state;
  }
};
