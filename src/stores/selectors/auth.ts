import { createSelector } from 'reselect';
import { State } from '../types';

export const selectAuthState = (state: State) => state.auth;

export const selectIsAuthInitialized = createSelector(
  selectAuthState,
  state => state.isInitialized,
);

export const selectAuthToken = createSelector(selectAuthState, state => state.token);

export const selectUser = createSelector(selectAuthState, state => state.user);

export const selectIsAuthorizeProcessing = createSelector(
  selectAuthState,
  state => state.isAuthorizeProcessing,
);
