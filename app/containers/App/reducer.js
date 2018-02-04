import { fromJS } from 'immutable';

import { getCurrentUser, setCurrentUser } from 'utils/localStorage';
import { actionTypes as at } from './constants';

const INITIAL_STATE = fromJS({
  currentUser: getCurrentUser()
});

const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case at.LOGGED: {
      const { data } = payload;

      setCurrentUser({ ...data, isAuthenticated: true });
      return state
        .set('currentUser', fromJS(data));
    }
    case at.LOGGED_OUT:

      setCurrentUser({ isAuthenticated: false });
      return state
        .set('currentUser', INITIAL_STATE.get('currentUser'));
    default:
      return state;
  }
};

export default appReducer;
