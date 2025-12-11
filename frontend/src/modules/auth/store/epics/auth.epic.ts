import { Epic } from 'redux-observable';
import { of, from } from 'rxjs';
import { mergeMap, map, catchError, filter, concatMap } from 'rxjs/operators';

import {
  signInRequest,
  signInSuccess,
  signInError,
  signUpRequest,
  signUpError,
  signUpSuccess,
  forgetPasswordRequest,
  forgetPasswordError,
  forgetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordError,
  resetPasswordSuccess,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '../actions';
import baseApi from '../../../../services/base-api';

import {
  AuthLoginResponse,
  AuthSignUpResponse,
  ForgetPasswordResponse,
  ResetPasswordResponse,
} from '../../types';
import {
  dummyAuthLoginResponse,
  dummyAuthSignUpResponse,
  dummyForgetPasswordResponse,
} from '../../mocks';
import { LocalStorageKeys, navigateToRoute } from '@/modules/shared';

export const signInUserEpic: Epic = (action$) => {
  return action$.pipe(
    filter(signInRequest.match),
    concatMap((action) =>
      // Change the URL once the Backend is ready
      from(
        baseApi.post<AuthLoginResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          const roles = dummyAuthLoginResponse.user.roles;
          localStorage.setItem(LocalStorageKeys.TOKEN, dummyAuthLoginResponse.authToken);
          localStorage.setItem(LocalStorageKeys.ROLES, JSON.stringify(roles));
          return of(signInSuccess(dummyAuthLoginResponse), navigateToRoute({ path: '/' }));
        }),
        catchError((error) => {
          console.log(error);
          return of(signInError({ error: { message: 'Wrong email/password', code: 401 } }));
        })
      )
    )
  );
};

export const signUpUserEpic: Epic = (action$) => {
  return action$.pipe(
    filter(signUpRequest.match),
    mergeMap((action) =>
      // Change the URL once the Backend is ready
      from(
        baseApi.post<AuthSignUpResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          localStorage.setItem(LocalStorageKeys.TOKEN, dummyAuthLoginResponse.authToken);
          return of(signUpSuccess(dummyAuthSignUpResponse), navigateToRoute({ path: '/' }));
        }),
        catchError((error) => {
          console.log(error);
          return of(signUpError({ error: { message: 'An error occurred', code: 400 } }));
        })
      )
    )
  );
};
export const forgetPasswordEpic: Epic = (action$) => {
  return action$.pipe(
    filter(forgetPasswordRequest.match),
    mergeMap((action) =>
      // Change the URL once the Backend is ready
      from(
        baseApi.post<ForgetPasswordResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        map(() => forgetPasswordSuccess(dummyForgetPasswordResponse)), //TODO: Check the response
        catchError((error) => {
          console.log(error);
          return of(forgetPasswordError({ error: { message: 'An error occurred', code: 400 } }));
        })
      )
    )
  );
};

export const resetPasswordEpic: Epic = (action$) => {
  return action$.pipe(
    filter(resetPasswordRequest.match),
    mergeMap((action) =>
      // Change the URL once the Backend is ready
      from(
        baseApi.post<ResetPasswordResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        map(() => resetPasswordSuccess({ successful: true })), //TODO: Check the response
        catchError((error) => {
          console.log(error);
          return of(resetPasswordError({ error: { message: 'An error occurred', code: 400 } }));
        })
      )
    )
  );
};

export const logoutEpic: Epic = (action$) => {
  return action$.pipe(
    filter(logoutRequest.match),
    mergeMap((action) =>
      // Change the URL once the Backend is ready. If there is logout API, call it here.
      // Otherwise, just remove the token from local storage.
      from(
        baseApi.post<ForgetPasswordResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        mergeMap(() => {
          localStorage.removeItem(LocalStorageKeys.TOKEN);
          return of(logoutSuccess(), navigateToRoute({ path: '/login' }));
        }),
        catchError((_) => {
          return of(logoutError());
        })
      )
    )
  );
};
