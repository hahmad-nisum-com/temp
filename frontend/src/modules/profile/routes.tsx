import type { RouteObject } from 'react-router-dom';
import {
  ProfilePage,
  ChangePasswordPage,
  SecuritySettingsPage,
  ProfilePreferencesPage,
} from './pages';
import { ProfileLayout } from './layout/profile-layout';

export const profileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: 'security',
        element: <SecuritySettingsPage />,
      },
      {
        path: 'preferences',
        element: <ProfilePreferencesPage />,
      },
    ],
  },
];
