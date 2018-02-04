import { actionTypes as at } from './constants';

export const save = () => ({
  type: at.SAVE
});

export const saveSuccess = ({ data }) => ({
  type: at.SAVE_SUCCESS,
  payload: { data }
});

export const saveError = ({ error }) => ({
  type: at.SAVE_ERROR,
  payload: { error }
});

export const change = ({ value, name }) => ({
  type: at.CHANGE,
  payload: { value, name }
});
