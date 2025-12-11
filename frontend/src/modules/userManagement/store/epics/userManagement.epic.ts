import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RootState } from '../../../../store';
import baseApi from '@/services/base-api';
import { actions as userManagementActions } from '../reducers/index';
import { PayloadAction } from '@reduxjs/toolkit';
import { User, UserFilters, UserFormData, UsersPaginatedResponse, UsersState } from '../../types';

const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserStatsRequest,
  fetchUserStatsSuccess,
  fetchUserStatsFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userManagementActions;

// Fetch users epic
const fetchUsersEpic: Epic<ReturnType<typeof fetchUsersRequest>, unknown, RootState> = (
  action$
) => {
  return action$.pipe(
    ofType(fetchUsersRequest.type),
    switchMap((action: PayloadAction<UserFilters>) =>
      from(baseApi.post<UsersPaginatedResponse>('/users/search', action.payload)).pipe(
        map((response) => fetchUsersSuccess(response.data)),
        catchError((error) => of(fetchUsersFailure(error.response?.data?.message || error.message)))
      )
    )
  );
};

// Fetch user stats epic
const fetchUserStatsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(fetchUserStatsRequest.type),
    switchMap(() =>
      from(
        baseApi.get<{ total: number; active: number; inactive: number; new: number }>(
          '/users/stats'
        )
      ).pipe(
        map((response) => fetchUserStatsSuccess(response.data)),
        catchError((error) =>
          of(fetchUserStatsFailure(error.response?.data?.message || error.message))
        )
      )
    )
  );

// Create user epic
const createUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(createUserRequest.type),
    mergeMap((action: PayloadAction<UserFormData>) =>
      from(baseApi.post<User>('/users', action.payload)).pipe(
        mergeMap((response) => [createUserSuccess(response.data), fetchUsersRequest({})]),
        catchError((error) => of(createUserFailure(error.response?.data?.message || error.message)))
      )
    )
  );

// Update user epic
const updateUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(updateUserRequest.type),
    mergeMap((action: PayloadAction<{ id: string; userData: UserFormData }>) =>
      from(baseApi.put<User>(`/users/${action.payload.id}`, action.payload.userData)).pipe(
        map((response) => updateUserSuccess(response.data)),
        catchError((error) => of(updateUserFailure(error.response?.data?.message || error.message)))
      )
    )
  );

// Delete user epic
const deleteUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(deleteUserRequest.type),
    mergeMap((action: PayloadAction<string>) =>
      from(baseApi.delete(`/users/${action.payload}`)).pipe(
        map(() => deleteUserSuccess(action.payload)),
        catchError((error) => of(deleteUserFailure(error.response?.data?.message || error.message)))
      )
    )
  );

export const usersEpics = [
  fetchUsersEpic,
  fetchUserStatsEpic,
  createUserEpic,
  updateUserEpic,
  deleteUserEpic,
];
