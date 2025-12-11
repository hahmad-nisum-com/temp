import { RootState } from '@/store';

// Users selectors
export const selectUsers = (state: RootState) => state.userManagement.items;
export const selectUsersLoading = (state: RootState) => state.userManagement.loading;
export const selectUsersError = (state: RootState) => state.userManagement.error;
export const selectUsersPagination = (state: RootState) => ({
  page: state.userManagement.page,
  pageSize: state.userManagement.pageSize,
  total: state.userManagement.total,
  totalPages: state.userManagement.totalPages,
});
export const selectUsersFilters = (state: RootState) => state.userManagement.filters;
export const selectSelectedUserIds = (state: RootState) => state.userManagement.selectedUserIds;
export const selectCurrentUser = (state: RootState) => state.userManagement.currentUser;

// User stats selectors
export const selectUserStats = (state: RootState) => state.userManagement.stats;
export const selectUserStatsLoading = (state: RootState) => state.userManagement.stats.loading;
