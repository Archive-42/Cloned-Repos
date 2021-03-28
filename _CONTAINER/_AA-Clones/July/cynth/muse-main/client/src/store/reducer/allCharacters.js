import { 
  SET_CHARACTERS, 
  CLEAR_CHARACTERS,
  DELETE_CHARACTER,
  PATCH_CHARACTER
} from '../constants/constants';


export default function characterReducer(state = {}, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTERS:
      return { ...state, ...payload };
      
    case CLEAR_CHARACTERS:
      return {};
      
    case PATCH_CHARACTER:
      const patchCharacter = { ...state };
      patchCharacter[payload.id] = payload;
      return patchCharacter;
      
    case DELETE_CHARACTER:
      const deleteCharacter = { ...state };
      delete deleteCharacter[payload]
      return deleteCharacter
      
    default:
      return state
  }
}