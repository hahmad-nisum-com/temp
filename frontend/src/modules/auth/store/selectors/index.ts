import { RootState } from '@/store';
import { createSelector } from 'reselect';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;

export const selectAuthLoginState = createSelector([selectAuth], (auth) => ({
  isLoading: auth.signInLoading,
  error: auth.signInError,
}));

export const selectAuthSignUpState = createSelector([selectAuth], (auth) => ({
  isLoading: auth.signUpLoading,
  error: auth.signUpError,
}));
