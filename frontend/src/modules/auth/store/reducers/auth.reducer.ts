import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthSignUpRequest,
  AuthSignUpResponse,
  AuthState,
  ErrorResponse,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  ResetPasswordForm,
  ResetPasswordResponse,
} from '../../types';

// Define the initial state
const initialState: AuthState = {
  authToken: '',
  user: null,
  isAuthorized: false,
  isEmailVerified: false,
  signInLoading: false,
  signInError: null,
  signUpLoading: false,
  signUpError: null,
  forgetPasswordLoading: false,
  forgetPasswordError: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest: (state, action: PayloadAction<AuthLoginRequest>) => {
      state.signInLoading = true;
      state.signInError = null;
    },
    signInSuccess: (state, action: PayloadAction<AuthLoginResponse>) => {
      state.signInLoading = false;
      state.isAuthorized = true;
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
    },
    signInError: (state, action: PayloadAction<{ error: ErrorResponse }>) => {
      state.signInLoading = false;
      state.signInError = action.payload.error;
    },
    signUpRequest: (state, action: PayloadAction<AuthSignUpRequest>) => {
      state.signUpLoading = true;
      state.signUpError = null;
    },
    signUpSuccess: (state, action: PayloadAction<AuthSignUpResponse>) => {
      state.signUpLoading = false;
      state.isEmailVerified = false;
    },
    signUpError: (state, action: PayloadAction<{ error: ErrorResponse }>) => {
      state.signUpLoading = false;
      state.signUpError = action.payload.error;
    },
    forgetPasswordRequest: (state, action: PayloadAction<ForgetPasswordRequest>) => {
      state.forgetPasswordLoading = true;
      state.forgetPasswordError = null;
    },
    forgetPasswordSuccess: (state, action: PayloadAction<ForgetPasswordResponse>) => {
      state.forgetPasswordLoading = false;
    },
    forgetPasswordError: (state, action: PayloadAction<{ error: ErrorResponse }>) => {
      state.forgetPasswordLoading = false;
      state.forgetPasswordError = action.payload.error;
    },
    resetPasswordRequest: (state, action: PayloadAction<ResetPasswordForm>) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = null;
    },
    resetPasswordSuccess: (state, action: PayloadAction<ResetPasswordResponse>) => {
      state.resetPasswordLoading = false;
    },
    resetPasswordError: (state, action: PayloadAction<{ error: ErrorResponse }>) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = action.payload.error;
    },
    resetErrorMessage: (state) => {
      state.signInError = null;
      state.signUpError = null;
      state.forgetPasswordError = null;
      state.resetPasswordError = null;
    },
    logoutRequest: (state) => {
      // Add loading state if needed here!!
    },
    logoutError: (state) => {
      // Add error state if needed here!!
    },
    logoutSuccess: () => initialState,
  },
});

export const { actions, reducer: authReducer } = authSlice;
