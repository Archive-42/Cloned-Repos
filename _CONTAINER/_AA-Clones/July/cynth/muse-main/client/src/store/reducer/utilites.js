import { 
  DRAWER_OPEN,
  SET_STATUS,  
} from "../constants/constants";



const initialState = {
  drawerOpen: false,
}

export default function utilitiesReducer(state = initialState, { type, payload }) {
  Object.freeze(state);
  
  switch(type) {
    case DRAWER_OPEN:
      return { ...state, ...payload };
    
    case SET_STATUS:
      // console.log('SET_STATUS: ', payload)
      return { ...state, ...payload };
      
    default:
      return state
  }
}