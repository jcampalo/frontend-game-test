import { actionTypes as at } from './constants';

export const logged = ({ data }) => ({
  type: at.LOGGED,
  payload: { data }
});

export const loggedOut = () => ({
  type: at.LOGGED_OUT
});

export const logout = () => ({
  type: at.LOG_OUT
});
