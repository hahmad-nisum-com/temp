import { RouterConfigs } from '../shared';
import { LoginPage, SignupPage, ForgotPassword, ResetPassword } from './pages';

import AuthLayout from '@/layouts/auth-layout';

export const authRoutes: RouterConfigs = {
  layout: <AuthLayout />,
  routes: [
    { path: 'login', element: <LoginPage /> },
    { path: 'forget-password', element: <ForgotPassword /> },
    { path: 'signup', element: <SignupPage /> },
    { path: 'reset-password', element: <ResetPassword /> },
  ],
};
