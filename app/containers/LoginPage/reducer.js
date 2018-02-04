import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';

const INITIAL_STATE = fromJS({
  error: {},
  username: '',
  password: '',
  loading: false
});

export default (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case at.LOGIN: {
      return state
        .set('error', INITIAL_STATE.get('error'))
        .set('loading', !INITIAL_STATE.get('loading'));
    }
    case at.LOGIN_SUCCESS: {
      const { data } = payload;

      return state
        .set('loading', INITIAL_STATE.get('loading'))
        .set('data', fromJS(data));
    }
    case at.LOGIN_ERROR: {
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
