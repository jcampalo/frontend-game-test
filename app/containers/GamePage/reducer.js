import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';

const INITIAL_STATE = fromJS({
  error: {},
  success: false,
  number: '',
  attempts: 3,
  loading: false
});

export default (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case at.SAVE: {
      return state
        .set('error', INITIAL_STATE.get('error'))
        .set('loading', !INITIAL_STATE.get('loading'))
        .set('attempts', state.get('attempts') - 1);
    }
    case at.SAVE_SUCCESS: {
      return state
        .set('loading', INITIAL_STATE.get('loading'))
        .set('success', !INITIAL_STATE.get('success'));
    }
    case at.SAVE_ERROR: {
      const { error } = payload;

      return state
        .set('error', fromJS(error))
        .set('loading', INITIAL_STATE.get('loading'));
    }
    case at.CHANGE: {
      const { name, value } = payload;

      return state
        .set(name, value);
    }
    default:
      return state;
  }
};
