import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ProfileState,
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ErrorResponse,
} from '../../types';

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
  updateProfileLoading: false,
  updateProfileError: null,
  changePasswordLoading: false,
  changePasswordError: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Fetch profile
    fetchProfileRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isLoading = false;
      state.profile = action.payload;
    },
    fetchProfileFailure: (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update profile
    updateProfileRequest: (state, action: PayloadAction<UpdateProfileRequest>) => {
      state.updateProfileLoading = true;
      state.updateProfileError = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.updateProfileLoading = false;
      state.profile = action.payload;
    },
    updateProfileFailure: (state, action: PayloadAction<ErrorResponse>) => {
      state.updateProfileLoading = false;
      state.updateProfileError = action.payload;
    },

    // Change password
    changePasswordRequest: (state, action: PayloadAction<ChangePasswordRequest>) => {
      state.changePasswordLoading = true;
      state.changePasswordError = null;
    },
    changePasswordSuccess: (state) => {
      state.changePasswordLoading = false;
    },
    changePasswordFailure: (state, action: PayloadAction<ErrorResponse>) => {
      state.changePasswordLoading = false;
      state.changePasswordError = action.payload;
    },

    // Reset errors
    resetErrors: (state) => {
      state.error = null;
      state.updateProfileError = null;
      state.changePasswordError = null;
    },
  },
});

export const { actions, reducer: profileReducer } = profileSlice;
