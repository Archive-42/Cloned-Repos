import {
  API,
  SET_IMAGE_URL,
  SET_CHARACTER_TRAIT,
  SET_BIO,
  SET_NEW_TRAIT,
  CLEAR_CHARACTER_TRAIT,
  CLEAR_FORM,
  CLEAR_CHARACTERS,
} from '../constants/constants';

export const setFormTrait = (trait) => async (dispatch) => {
  if (!trait) return;
  dispatch({ type: SET_CHARACTER_TRAIT, payload: trait });
};

export const clearFormTrait = traitType => async dispatch => {
  if (!traitType) return;
  
  dispatch({ type: CLEAR_CHARACTER_TRAIT, payload: traitType })
}

export const setImageUrl = (imageUrl) => async (dispatch) => {
  dispatch({ type: SET_IMAGE_URL, payload: imageUrl });
};

export const setBio = (bio) => async (dispatch) => {
  dispatch({ type: SET_BIO, payload: bio });
};

export const clearForm = () => async dispatch => {
  dispatch({ type: CLEAR_FORM })
}

export const clearCharacters = () => async dispatch => {
  dispatch({ type: CLEAR_CHARACTERS })
}

export const postFormTrait = trait => {
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: '/traits',
      body: JSON.stringify(trait),
      actionConst: SET_CHARACTER_TRAIT,
      secondActionConst: SET_NEW_TRAIT,
    }
  }
}