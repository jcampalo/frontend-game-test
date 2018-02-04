import { fromJS } from 'immutable';

import { DEFAULT_LOCALE } from 'containers/App/constants';
import { actionTypes as at } from './constants';

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

const languageProviderReducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case at.CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
};

export default languageProviderReducer;
