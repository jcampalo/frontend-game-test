import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

const routeInitialState = fromJS({
  location: null,
});

const routeReducer = (state = routeInitialState, { type, payload: location }) => {
  switch (type) {
    case LOCATION_CHANGE:
      return state.merge({ location });
    default:
      return state;
  }
};

const createReducer = injectedReducers => {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers
  });
};

export default createReducer;
