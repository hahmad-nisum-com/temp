import { z, ZodType } from 'zod';
import { ForgetPasswordForm, LoginForm, ResetPasswordForm, SignUpForm } from '../types';

export const password_regex = '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$';

export const forgetPasswordSchema: ZodType<ForgetPasswordForm> = z.object({
  email: z.string().email(),
});

export const signInFormSchema: ZodType<LoginForm> = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password cannot be empty'),
});

export const signupSchema: ZodType<SignUpForm> = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
    phone: z.object({
      countryCode: z.string().min(2, { message: 'Country code cannot be empty' }),
      phoneNumber: z.string().min(1, { message: 'Phone number cannot be empty' }), // Add proper validations by calling refine method
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema: ZodType<ResetPasswordForm> = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });
