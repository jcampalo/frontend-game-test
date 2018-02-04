import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import request from 'utils/request';
import { logout } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import { actionTypes as at } from './constants';
import { selectNumber, selectAttempts } from './selectors';
import { saveSuccess, saveError } from './actions';
import messages from './messages';

const onSave = (action$, store) => {
  return action$
    .ofType(at.SAVE)
    .mergeMap(() => {
      const requestURL = 'http://localhost:3000/game';
      const { session } = selectCurrentUser()(store.getState());
      const number = selectNumber()(store.getState());

      return Observable
        .fromPromise(
          request(requestURL, {
            method: 'POST',
            headers: {
              'X-Auth-Token': session
            },
            body: {
              number
            }
          })
        )
        .mergeMap(({ tasks: data }) => [saveSuccess({ data })])
        .catch(() => {
          const attempts = selectAttempts()(store.getState());

          if (attempts <= 0) {
            return [logout()];
          }

          return Observable.of(saveError({ error: messages.error }));
        });
    });
};

export default combineEpics(onSave);
