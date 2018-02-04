import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const selectCurrentUser = () => createSelector(
  selectGlobal,
  globalState => globalState.get('currentUser').toJS()
);

const selectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.get('location').toJS()
);

export {
  selectGlobal,
  selectCurrentUser,
  selectLocation,
};
