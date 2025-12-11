import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationActionPayload } from '../../types';

// INFO: This reducer can be used to managed navigation history and routes

// Define the initial state
const initialState = {
  path: '',
};

const navigationHistory = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToRoute: (state, action: PayloadAction<NavigationActionPayload>) => {
      state.path = '';
    },
  },
});

export const { actions, reducer: navigationReducer } = navigationHistory;
