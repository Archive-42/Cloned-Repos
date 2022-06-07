import { SET_TRAITS, SET_NEW_TRAIT, CLEAR_TRAITS } from '../constants/constants';

const initialState = {
  // firstName: {},
  // lastName: {},
  // physical: {},
  // strengths: {},
  // weaknesses: {},
  // motivations: {},
  // secrets: {},
}

export default function traitsReducer(state = initialState, { type, payload }) {
  Object.freeze(state);

  switch (type) {
    case SET_TRAITS:

      return { ...state, ...payload };

    case SET_NEW_TRAIT:
      // console.log('SET_NEW_TRAIT: ', payload)
      const newState = { ...state };
      newState[payload.type][payload.id] = payload
      return newState
      
    case CLEAR_TRAITS:
      return initialState;

    default:
      return state;
  }
}
