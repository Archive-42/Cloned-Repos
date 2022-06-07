import {
  API,
  SET_CHARACTERS,
  SET_STATUS,
  SET_MODIFY_CHARACTER,
  SET_MODIFY_IMG_URL,
  SET_MODIFY_BIO,
  PATCH_CHARACTER,
  DELETE_CHARACTER,
} from '../constants/constants';

// ********************************************************

export const setStatus = (status) => async (dispatch) => {
  dispatch({ type: SET_STATUS, payload: { status } });
};

export const setModifyCharacter = (character) => {
  return { type: SET_MODIFY_CHARACTER, payload: character };
};

export const setModImgUrl = (imgUrl) => {
  return { type: SET_MODIFY_IMG_URL, payload: imgUrl };
};

export const setModBio = (bio) => {
  return { type: SET_MODIFY_BIO, payload: bio };
};

// **********************************************************

export const getCharacters = () => {
  return {
    type: API,
    payload: {
      endpoint: `/characters`,
      method: 'GET',
      actionConst: SET_CHARACTERS,
    },
  };
};

export const postCharacter = (character) => {
  // console.log('Post Character: ', character)
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: `/characters`,
      body: JSON.stringify(character),
      actionConst: 'DO_NOTHING',
    },
  };
};

export const patchCharacter = (character) => {
  return {
    type: API,
    payload: {
      endpoint: `/characters/${character.id}`,
      method: 'PATCH',
      body: JSON.stringify(character),
      actionConst: PATCH_CHARACTER,
    },
  };
};

export const deleteCharacter = (characterId) => {
  return {
    type: API,
    payload: {
      endpoint: `/characters/${characterId}`,
      method: 'DELETE',
      actionConst: DELETE_CHARACTER,
    },
  };
};
