import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { selectCurrentUser } from './selectors';
import { actionTypes as at } from './constants';
import { loggedOut } from './actions';

const onLogout = (action$, store) => {
  return action$
    .ofType(at.LOG_OUT)
    .mergeMap(() => {
      const requestURL = 'http://localhost:3000/logout';
      const { session } = selectCurrentUser()(store.getState());

      return Observable
        .fromPromise(
          request(requestURL, {
            method: 'POST',
            headers: {
              'X-Auth-Token': session
            },
            body: {}
          })
        )
        .mergeMap(() => [loggedOut(), push('/login')])
        .catch(() => [loggedOut(), push('/login')]);
    });
};

export default combineEpics(onLogout);
