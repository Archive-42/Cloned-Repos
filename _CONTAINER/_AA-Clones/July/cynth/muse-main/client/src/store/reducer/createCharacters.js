import {
  SET_CHARACTER_TRAIT,
  SET_BIO,
  SET_IMAGE_URL,
  CLEAR_CHARACTER_TRAIT,
  CLEAR_FORM,
} from '../constants/constants';

const initState = {
  firstName: '',
  lastName: '',
  physical: '',
  strengths: '',
  weaknesses: '',
  motivations: '',
  secrets: '',
  imageUrl: '',
  bio: '',
};

export default function characterReducer(state = initState, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTER_TRAIT:
      // console.log('SET_CHARACTER_TRAIT: ', payload);
      const newState = { ...state };
      // delete payload.undefined;
      newState[payload.type] = payload;
      return newState;
    
    case CLEAR_CHARACTER_TRAIT:
      const newStateClear = { ...state };
      delete newStateClear.undefined
      newStateClear[payload] = null;
      return newStateClear
    
    case CLEAR_FORM:
      return initState;

    case SET_IMAGE_URL:
      return { ...state, imageUrl: payload };

    case SET_BIO:
      return { ...state, bio: payload };

    default:
      return state;
  }
}
