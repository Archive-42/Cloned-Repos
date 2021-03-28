import { 
  SET_MODIFY_CHARACTER,
  SET_MODIFY_IMG_URL,
  SET_MODIFY_BIO,
  SET_MODIFY_TRAIT,
  SET_DELETED,
  CLEAR_MODIFIED,
} from '../constants/constants';

const initialState = {}

export default function characterReducer(state = initialState, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
      
    case SET_DELETED:
      return { ...state, ...payload };
      
    case CLEAR_MODIFIED:
      return initialState;
    
    case SET_MODIFY_CHARACTER:
      return { ...state, ...payload }
      
    case SET_MODIFY_IMG_URL:
      return { ...state, imageUrl: payload };
      
    case SET_MODIFY_BIO:
      return { ...state, bio: payload };
      
    case SET_MODIFY_TRAIT:
      // console.log('SET_MODIFY_TRAIT: ', payload)
      const traits = { ...state.traits, [payload.type]: payload.id };
      return { ...state, traits };
      
    
      
    default:
      return state
  }
}