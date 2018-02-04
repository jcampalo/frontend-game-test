import { combineEpics } from 'redux-observable';

import AppEpic from 'containers/App/epic';

export default combineEpics(AppEpic);
