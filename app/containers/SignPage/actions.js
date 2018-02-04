import { actionTypes as at } from './constants';

export const sign = () => ({
  type: at.SIGN
});

export const signSuccess = ({ data }) => ({
  type: at.SIGN_SUCCESS,
  payload: { data }
});

export const signError = ({ error }) => ({
  type: at.SIGN_ERROR,
  payload: { error }
});

export const change = ({ value, name }) => ({
  type: at.CHANGE,
  payload: { value, name }
});
