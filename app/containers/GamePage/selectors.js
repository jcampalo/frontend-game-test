import { createSelector } from 'reselect';

import { key } from './constants';

const selectGameStore = state => state.get(key);

const selectLoading = () => createSelector(
  selectGameStore,
  gameStore => gameStore.get('loading')
);

const selectNumber = () => createSelector(
  selectGameStore,
  gameStore => gameStore.get('number')
);

const selectAttempts = () => createSelector(
  selectGameStore,
  gameStore => gameStore.get('attempts')
);

const selectSuccess = () => createSelector(
  selectGameStore,
  gameStore => gameStore.get('success')
);

export {
  selectLoading,
  selectNumber,
  selectAttempts,
  selectSuccess
};
