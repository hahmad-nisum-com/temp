export type UserRole = 'Admin' | 'User' | 'Editor';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  avatarUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: keyof User;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface UsersPaginatedResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserFormProps {
  user?: User;
  onSuccess: () => void;
}
export interface UsersTableProps {
  users: User[];
  loading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface UsersState {
  items: User[];
  selectedUserIds: string[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: UserFilters;
  loading: boolean;
  error: string | null;
  currentUser: User | null;
  stats: {
    total: number;
    active: number;
    inactive: number;
    new: number;
    loading: boolean;
  };
}
