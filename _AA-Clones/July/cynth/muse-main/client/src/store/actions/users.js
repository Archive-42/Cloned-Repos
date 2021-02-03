import { baseApiUrl } from '../../config/config';
import { PUT_USER, TOKEN_KEY } from '../constants/constants';


export const putUser = modifiedUser => async dispatch => {
  const token = localStorage.getItem(TOKEN_KEY)
  
  const response = await fetch(`${baseApiUrl}/users/${modifiedUser.id}`, {
    method: 'PUT',
    body: modifiedUser,
    headers: {
      'Content-Type': 'application/json',
      authentication: `Bearer ${token}`,
    },
  });
  
  if (response.ok) {
    const { user } = await response.json();
    dispatch({ type: PUT_USER, payload: user })
  }
  
}