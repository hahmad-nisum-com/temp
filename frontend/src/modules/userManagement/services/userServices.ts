import { User, UserFormData, UserFilters, UsersPaginatedResponse } from '../types/index';
import { mockUsers } from '../mocks/index';

// In a real application, these would make API calls
// For now, we'll use the mock data

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  // Get users with pagination and filtering
  async getUsers(filters: UserFilters = {}): Promise<UsersPaginatedResponse> {
    await delay(500); // Simulate API delay

    const {
      search = '',
      role,
      status,
      sortBy = 'name',
      sortDirection = 'asc',
      page = 1,
      pageSize = 5,
    } = filters;

    // Filter users
    let filteredUsers = [...mockUsers];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    // Sort users
    filteredUsers.sort((a, b) => {
      if (sortBy === 'lastActive') {
        return sortDirection === 'asc'
          ? new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
          : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
      }

      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    // Calculate pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    return {
      users: paginatedUsers,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  // Get a single user by ID
  async getUserById(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find((user: { id: string }) => user.id === id) || null;
  },

  // Create a new user
  async createUser(userData: UserFormData): Promise<User> {
    await delay(700);

    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      ...userData,
      lastActive: new Date().toISOString(),
      avatarUrl: '/placeholder.svg?height=40&width=40',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call
    // For now, we'll just return the new user
    return newUser;
  },

  // Update an existing user
  async updateUser(id: string, userData: UserFormData): Promise<User> {
    await delay(700);

    const existingUser = mockUsers.find((user: { id: string }) => user.id === id);

    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call
    return updatedUser;
  },

  // Delete a user
  async deleteUser(id: string): Promise<boolean> {
    await delay(500);

    // In a real app, this would be an API call
    return true;
  },

  // Get user statistics
  async getUserStats() {
    await delay(400);
    console.log('🚀 ~ getUserStats ~ delay:');

    return {
      total: mockUsers.length,
      active: mockUsers.filter((user: { status: string }) => user.status === 'Active').length,
      inactive: mockUsers.filter((user: { status: string }) => user.status === 'Inactive').length,
      pending: mockUsers.filter((user: { status: string }) => user.status === 'Pending').length,
      // TODO: Fix it
      // Calculate new users (created in the last 30 days)
      new: mockUsers.filter((user: { createdAt: string }) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(user.createdAt || '') > thirtyDaysAgo;
      }).length,
    };
  },
};
