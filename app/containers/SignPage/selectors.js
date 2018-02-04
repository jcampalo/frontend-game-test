import { createSelector } from 'reselect';

import { key } from './constants';

const selectSignStore = state => state.get(key);

const selectLoading = () => createSelector(
  selectSignStore,
  signStore => signStore.get('loading')
);

const selectUsername = () => createSelector(
  selectSignStore,
  signStore => signStore.get('username')
);

const selectPassword = () => createSelector(
  selectSignStore,
  signStore => signStore.get('password')
);

const selectError = () => createSelector(
  selectSignStore,
  signStore => signStore.get('error').toJS()
);

export {
  selectLoading,
  selectUsername,
  selectPassword,
  selectError
};
