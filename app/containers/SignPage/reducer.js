import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';

const INITIAL_STATE = fromJS({
  data: {},
  error: {},
  username: '',
  password: '',
  loading: false
});

export default (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case at.SIGN: {
      return state
        .set('data', INITIAL_STATE.get('data'))
        .set('error', INITIAL_STATE.get('error'))
        .set('loading', !INITIAL_STATE.get('loading'));
    }
    case at.SIGN_SUCCESS: {
      const { data } = payload;

      return state
        .set('data', fromJS(data))
        .set('loading', INITIAL_STATE.get('loading'));
    }
    case at.SIGN_ERROR: {
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
