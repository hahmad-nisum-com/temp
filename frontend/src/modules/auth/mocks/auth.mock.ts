import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthSignUpRequest,
  AuthSignUpResponse,
  AuthState,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  ResetPasswordResponse,
  User,
} from '../types';

export const dummyUser: User = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  createdDate: '2023-01-01T00:00:00Z',
  isEmailVerified: true,
  roles: ['admin'],
};

export const dummyAuthState: AuthState = {
  user: dummyUser,
  isAuthorized: true,
  isEmailVerified: true,
  authToken: 'dummyAuthToken12345',
  signInLoading: false,
  signInError: null,
  signUpLoading: false,
  signUpError: null,
  forgetPasswordLoading: false,
  forgetPasswordError: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
};

export const dummyAuthLoginRequest: AuthLoginRequest = {
  email: dummyUser.email,
  password: 'dummyPassword123',
};

export const dummyAuthLoginResponse: AuthLoginResponse = {
  user: dummyUser,
  authToken: 'dummyAuthToken12345',
};

export const dummyAuthSignUpRequest: AuthSignUpRequest = {
  email: dummyUser.email,
  password: 'dummyPassword123',
  firstName: dummyUser.firstName,
  lastName: dummyUser.lastName,
};

export const dummyAuthSignUpResponse: AuthSignUpResponse = {
  isEmailVerified: true,
};

export const dummyForgetPasswordRequest: ForgetPasswordRequest = {
  email: 'john.doe@example.com',
};

export const dummyForgetPasswordResponse: ForgetPasswordResponse = {
  successful: true,
};

export const dummyResetPasswordResponse: ResetPasswordResponse = {
  successful: true,
};
