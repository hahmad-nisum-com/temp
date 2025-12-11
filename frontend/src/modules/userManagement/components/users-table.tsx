'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, MoreHorizontal, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { EditUserDialog } from './edit-user-dialog';
import { DeleteUserDialog } from './delete-user-dialog';
import { User, UsersTableProps } from '../types/index';
import { actions as userManagementActions } from '../store/actions';
import { selectSelectedUserIds, selectUsersFilters } from '../store/selectors';

const { setSort, setPage, toggleUserSelection, setCurrentUser } = userManagementActions;

export function UsersTable({ users, loading, pagination }: UsersTableProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector(selectUsersFilters);
  const selectedUserIds = useSelector(selectSelectedUserIds);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // Controlled dropdown state: track which row's dropdown is open by its user id.
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Handle sorting
  const handleSort = (field: keyof User) => {
    const newDirection =
      filters.sortBy === field && filters.sortDirection === 'asc' ? 'desc' : 'asc';

    dispatch(
      setSort({
        sortBy: field,
        sortDirection: newDirection,
      })
    );
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      dispatch(setPage(pagination.page - 1));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      dispatch(setPage(pagination.page + 1));
    }
  };

  // Handle row selection
  const handleToggleSelection = (userId: string) => {
    dispatch(toggleUserSelection(userId));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  // Optionally, cleanup any lingering styles when no modal is open
  useEffect(() => {
    if (!editingUser && !deletingUser) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [editingUser, deletingUser]);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 font-medium"
                >
                  {t('userManagement.table.name')}
                  {filters.sortBy === 'name' &&
                    (filters.sortDirection === 'asc' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('role')}
                  className="flex items-center gap-1 font-medium"
                >
                  {t('userManagement.table.role')}
                  {filters.sortBy === 'role' &&
                    (filters.sortDirection === 'asc' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 font-medium"
                >
                  {t('userManagement.table.status')}
                  {filters.sortBy === 'status' &&
                    (filters.sortDirection === 'asc' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('lastActive')}
                  className="flex items-center gap-1 font-medium"
                >
                  {t('userManagement.table.lastActive')}
                  {filters.sortBy === 'lastActive' &&
                    (filters.sortDirection === 'asc' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="w-[80px]">{t('userManagement.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : users?.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  data-state={selectedUserIds.includes(user.id) ? 'selected' : undefined}
                  onClick={() => handleToggleSelection(user.id)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.role === 'Admin' ? (
                        <ShieldAlert className="h-4 w-4 text-rose-500" />
                      ) : user.role === 'Editor' ? (
                        <ShieldCheck className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Shield className="h-4 w-4 text-slate-400" />
                      )}
                      {t(`userManagement.roles.${user.role.toLowerCase()}`)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'Active'
                          ? 'default'
                          : user.status === 'Inactive'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {t(`userManagement.status.${user.status.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu
                      open={openDropdownId === user.id}
                      onOpenChange={(open) => setOpenDropdownId(open ? user.id : null)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                          {t('userManagement.actions.copyId')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setOpenDropdownId(null);
                            setEditingUser(user);
                            setDeletingUser(null);
                            dispatch(setCurrentUser(user));
                          }}
                        >
                          {t('userManagement.actions.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setOpenDropdownId(null);
                            setDeletingUser(user);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          {t('userManagement.actions.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {t('userManagement.table.noUsers')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {t('userManagement.table.selected', {
            count: selectedUserIds.length,
            total: pagination?.total,
          })}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={pagination?.page === 1}
          >
            {t('userManagement.table.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={pagination?.page === pagination?.totalPages}
          >
            {t('userManagement.table.next')}
          </Button>
        </div>
      </div>

      {editingUser && (
        <EditUserDialog
          user={editingUser || ({} as User)}
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={() => setDeletingUser(null)}
        />
      )}
    </div>
  );
}
