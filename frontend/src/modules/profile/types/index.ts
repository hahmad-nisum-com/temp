export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: ErrorResponse | null;
  updateProfileLoading: boolean;
  updateProfileError: ErrorResponse | null;
  changePasswordLoading: boolean;
  changePasswordError: ErrorResponse | null;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  jobTitle: string;
  department: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  jobTitle: string;
  department: string;
  location: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
