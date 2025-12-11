import { z } from 'zod';
import type { ZodType } from 'zod';
import type { ProfileFormData, ChangePasswordFormData } from '../types';

export const profileFormSchema: ZodType<ProfileFormData> = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  phone: z.string().optional(),
  bio: z.string().max(500, { message: 'Bio must be less than 500 characters' }).optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
});

export const changePasswordSchema: ZodType<ChangePasswordFormData> = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
