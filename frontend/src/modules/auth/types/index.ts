// Export auth types here

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
  isEmailVerified: boolean;
  roles: string[];
}
export interface AuthState {
  user: User | null;
  isAuthorized: boolean;
  isEmailVerified: boolean;
  authToken: string;
  signInLoading: boolean;
  signInError: ErrorResponse | null;
  signUpLoading: boolean;
  signUpError: ErrorResponse | null;
  forgetPasswordLoading: boolean;
  forgetPasswordError: ErrorResponse | null;
  resetPasswordLoading: boolean;
  resetPasswordError: ErrorResponse | null;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  user: User;
  authToken: string;
}

export interface AuthSignUpRequest extends AuthLoginRequest {
  firstName: string;
  lastName: string;
}

export interface AuthSignUpResponse {
  isEmailVerified: boolean;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ForgetPasswordResponse {
  successful: boolean;
}

export interface ResetPasswordResponse {
  successful: boolean;
}

export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phone: {
    countryCode: string;
    phoneNumber: string;
  };
};

export type ForgetPasswordForm = {
  email: string;
};

export type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};
export type ErrorResponse = {
  code: number;
  message: string;
};
