import { csrfFetch } from './csrf';

const RESTORED_USER = 'session/restoreUser';
const SET_USER = 'session/setUser';
const REMOVED_USER = 'session/removeUser';

const restoredUser = (user) => {
  return {
    type:RESTORED_USER,
    payload: user
  }
};

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removedUser = () => {
  return {
    type: REMOVED_USER,
  };
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(restoredUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RESTORED_USER:
      newState = {...state};
      newState.user = action.payload;
      return newState;
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVED_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
