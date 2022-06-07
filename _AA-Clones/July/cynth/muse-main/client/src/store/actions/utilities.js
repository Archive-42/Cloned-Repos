import { 
  DRAWER_OPEN,
  SET_STATUS
} from "../constants/constants";



export const toggleDrawer = drawerOpen => {
  return { type: DRAWER_OPEN, payload: { drawerOpen } }
}

export const setStatus = (status) => async (dispatch) => {
  dispatch({ type: SET_STATUS, payload: { status } });
};