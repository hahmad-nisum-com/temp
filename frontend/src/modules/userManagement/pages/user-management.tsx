'use client';

import { useEffect, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UsersTable } from '@/modules/userManagement/components';
import { UserStats } from '@/modules/userManagement/components';
import { AddUserButton } from '@/modules/userManagement/components/add-user-button';
import { UserSearch } from '@/modules/userManagement/components/user-search';
import { actions as userManagementActions } from '@/modules/userManagement/store/actions';
import {
  selectUsers,
  selectUsersLoading,
  selectUsersPagination,
  selectUsersFilters,
} from '@/modules/userManagement/store/selectors';
import { Skeleton } from '@/components/ui/skeleton';

const { fetchUsersRequest, fetchUserStatsRequest } = userManagementActions;

export function UserManagement() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const pagination = useSelector(selectUsersPagination);
  const filters = useSelector(selectUsersFilters, shallowEqual);

  // Memoized fetch function to prevent unnecessary recreations
  const fetchData = useCallback(() => {
    dispatch(fetchUsersRequest(filters));
    dispatch(fetchUserStatsRequest());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-w-full mx-auto text-muted-foreground">
      <div className="flex min-w-2xl flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-muted-foreground">
              {t('userManagement.title')}
            </h1>
          </div>
          <div className="flex gap-2">
            <AddUserButton />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 w-full md:grid-cols-1 lg:grid-cols-1">
          <UserStats />
        </div>

        {/* Search and Filters */}
        <div className="rounded-lg border p-4 shadow-sm">
          <UserSearch />
        </div>

        {/* Users Table with Loading State */}
        <div className="rounded-lg border shadow-sm">
          {loading ? (
            <div className="space-y-4 p-4">
              <Skeleton className="h-10 w-full" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <UsersTable users={users} loading={loading} pagination={pagination} />
          )}
        </div>
      </div>
    </div>
  );
}
