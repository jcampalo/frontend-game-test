import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { logged } from 'containers/App/actions';
import { actionTypes as at } from './constants';
import { selectUsername, selectPassword } from './selectors';
import { loginSuccess, loginError } from './actions';
import messages from './messages';

const onLogin = (action$, store) => {
  return action$
    .ofType(at.LOGIN)
    .mergeMap(() => {
      const requestURL = 'http://localhost:3000/login';
      const username = selectUsername()(store.getState());
      const password = selectPassword()(store.getState());

      return Observable
        .fromPromise(
          request(requestURL, {
            method: 'POST',
            body: {
              username,
              password
            }
          })
        )
        .mergeMap(data => [loginSuccess({ data }), logged({ data }), push('/game')])
        .catch(() => Observable.of(loginError({ error: messages.error })));
    });
};

export default combineEpics(onLogin);
