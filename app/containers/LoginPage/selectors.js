import { createSelector } from 'reselect';

import { key } from './constants';

const selectLoginStore = state => state.get(key);

const selectLoading = () => createSelector(
  selectLoginStore,
  loginStore => loginStore.get('loading')
);

const selectUsername = () => createSelector(
  selectLoginStore,
  loginStore => loginStore.get('username')
);

const selectPassword = () => createSelector(
  selectLoginStore,
  loginStore => loginStore.get('password')
);

const selectError = () => createSelector(
  selectLoginStore,
  loginStore => loginStore.get('error').toJS()
);

export {
  selectLoading,
  selectUsername,
  selectPassword,
  selectError
};
