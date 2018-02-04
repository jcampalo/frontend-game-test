import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { actionTypes as at } from './constants';
import { selectUsername, selectPassword } from './selectors';
import { signSuccess, signError } from './actions';
import messages from './messages';

const onSign = (action$, store) => {
  return action$
    .ofType(at.SIGN)
    .mergeMap(() => {
      const requestURL = 'http://localhost:3000/sign';
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
        .mergeMap(data => [signSuccess({ data }), push('/login')])
        .catch(() => Observable.of(signError({ error: messages.error })));
    });
};

export default combineEpics(onSign);
