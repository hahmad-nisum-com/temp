import { type Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import type { RootState } from '../../../../store';
import baseApi from '@/services/base-api';
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from '../actions';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '../../types';
import { mockUserProfile } from '../../mocks/profile.mock';

// Fetch profile epic
const fetchProfileEpic: Epic<ReturnType<typeof fetchProfileRequest>, unknown, RootState> = (
  action$
) => {
  return action$.pipe(
    ofType(fetchProfileRequest.type),
    switchMap(() =>
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate an API call with a mock response
      from(baseApi.get<UserProfile>('/profile')).pipe(
        map(() => fetchProfileSuccess(mockUserProfile)),
        catchError((error) =>
          of(fetchProfileFailure(error.response?.data || { code: 500, message: error.message }))
        )
      )
    )
  );
};

// Update profile epic
const updateProfileEpic: Epic = (action$) =>
  action$.pipe(
    ofType(updateProfileRequest.type),
    mergeMap((action: PayloadAction<UpdateProfileRequest>) =>
      from(baseApi.put<UserProfile>('/profile', action.payload)).pipe(
        map(() => {
          // Simulate a successful response with updated profile
          const updatedProfile = {
            ...mockUserProfile,
            ...action.payload,
            updatedAt: new Date().toISOString(),
          };
          return updateProfileSuccess(updatedProfile);
        }),
        catchError((error) =>
          of(updateProfileFailure(error.response?.data || { code: 500, message: error.message }))
        )
      )
    )
  );

// Change password epic
const changePasswordEpic: Epic = (action$) =>
  action$.pipe(
    ofType(changePasswordRequest.type),
    mergeMap((action: PayloadAction<ChangePasswordRequest>) =>
      from(baseApi.put('/profile/change-password', action.payload)).pipe(
        map(() => changePasswordSuccess()),
        catchError((error) =>
          of(changePasswordFailure(error.response?.data || { code: 500, message: error.message }))
        )
      )
    )
  );

export const profileEpics = [fetchProfileEpic, updateProfileEpic, changePasswordEpic];
