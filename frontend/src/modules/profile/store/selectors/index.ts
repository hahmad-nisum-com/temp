import type { RootState } from '@/store';
import { createSelector } from 'reselect';

// Profile selectors
export const selectProfile = (state: RootState) => state.profile;

export const selectUserProfile = createSelector([selectProfile], (profile) => profile.profile);

export const selectProfileLoading = createSelector([selectProfile], (profile) => profile.isLoading);

export const selectProfileError = createSelector([selectProfile], (profile) => profile.error);

export const selectUpdateProfileLoading = createSelector(
  [selectProfile],
  (profile) => profile.updateProfileLoading
);

export const selectUpdateProfileError = createSelector(
  [selectProfile],
  (profile) => profile.updateProfileError
);

export const selectChangePasswordLoading = createSelector(
  [selectProfile],
  (profile) => profile.changePasswordLoading
);

export const selectChangePasswordError = createSelector(
  [selectProfile],
  (profile) => profile.changePasswordError
);
