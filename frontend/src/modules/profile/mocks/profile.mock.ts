import type { UserProfile } from '../types';

export const mockUserProfile: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '/placeholder.svg?height=128&width=128',
  bio: 'Software engineer with 5+ years of experience in web development. Passionate about creating user-friendly applications and solving complex problems.',
  jobTitle: 'Senior Software Engineer',
  department: 'Engineering',
  location: 'San Francisco, CA',
  createdAt: '2022-01-15T10:30:00.000Z',
  updatedAt: '2023-05-20T14:45:00.000Z',
};
