import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFilters, UsersPaginatedResponse, UsersState } from '../../types/index';

const initialState: UsersState = {
  items: [],
  selectedUserIds: [],
  total: 0,
  page: 1,
  pageSize: 5,
  totalPages: 0,
  filters: {
    sortBy: 'name',
    sortDirection: 'asc',
    page: 1,
    pageSize: 5,
  },
  loading: false,
  error: null,
  currentUser: null,
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
    new: 0,
    loading: false,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Fetch users
    fetchUsersRequest: (state, action: PayloadAction<UserFilters>) => {
      state.loading = true;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    fetchUsersSuccess: (state, action: PayloadAction<UsersPaginatedResponse>) => {
      state.loading = false;
      state.items = action.payload.users;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch user stats
    fetchUserStatsRequest: (state) => {
      state.stats.loading = true;
    },
    fetchUserStatsSuccess: (
      state,
      action: PayloadAction<{
        total: number;
        active: number;
        inactive: number;
        new: number;
      }>
    ) => {
      state.stats.loading = false;
      state.stats.total = action.payload.total;
      state.stats.active = action.payload.active;
      state.stats.inactive = action.payload.inactive;
      state.stats.new = action.payload.new;
    },
    fetchUserStatsFailure: (state) => {
      state.stats.loading = false;
    },

    // Create user
    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      // We don't add the user to the items array here because we'll refetch the list
    },
    createUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update user
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.items = state.items.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete user
    deleteUserRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter((user) => user.id !== action.payload);
      state.selectedUserIds = state.selectedUserIds.filter((id) => id !== action.payload);
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Select/deselect users
    toggleUserSelection: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.selectedUserIds.includes(userId)) {
        state.selectedUserIds = state.selectedUserIds.filter((id) => id !== userId);
      } else {
        state.selectedUserIds.push(userId);
      }
    },
    selectAllUsers: (state) => {
      state.selectedUserIds = state.items.map((user) => user.id);
    },
    deselectAllUsers: (state) => {
      state.selectedUserIds = [];
    },

    // Set current user (for editing)
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },

    // Update filters
    updateFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Set sort
    setSort: (
      state,
      action: PayloadAction<{ sortBy: keyof User; sortDirection: 'asc' | 'desc' }>
    ) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortDirection = action.payload.sortDirection;
    },

    // Set page
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
  },
});

export const { actions, reducer: userManagementReducer } = usersSlice;
