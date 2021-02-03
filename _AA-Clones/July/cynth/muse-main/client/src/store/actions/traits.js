import { 
  API, 
  SET_TRAITS, 
  SET_MODIFY_TRAIT,
  SET_NEW_TRAIT,
} from '../constants/constants';


export const getTraits = () => {
  return {
    type: API,
    payload: {
      endpoint: `/traits`,
      method: 'GET',
      actionConst: SET_TRAITS,
    },
  }
}

export const postModTrait = trait => {
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: '/traits',
      body: JSON.stringify(trait),
      actionConst: SET_NEW_TRAIT,
      secondActionConst: SET_MODIFY_TRAIT,
    }
  }
}


// ********************************************************


export const setModTrait = payload => {
  // console.log('SET MOD TRAIT: ', )
  return { type: SET_MODIFY_TRAIT, payload }
}