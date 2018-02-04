import { actionTypes as at } from './constants';

export const login = () => ({
  type: at.LOGIN
});

export const loginSuccess = ({ data }) => ({
  type: at.LOGIN_SUCCESS,
  payload: { data }
});

export const loginError = ({ error }) => ({
  type: at.LOGIN_ERROR,
  payload: { error }
});

export const change = ({ value, name }) => ({
  type: at.CHANGE,
  payload: { value, name }
});
