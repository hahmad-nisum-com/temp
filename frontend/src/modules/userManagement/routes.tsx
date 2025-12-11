import { CustomRouterObject } from '@/modules/shared';
import { UserManagement } from './pages';

export const userManagementRoutes: CustomRouterObject[] = [
  {
    path: '/user-management',
    element: <UserManagement />,
    allowedRoles: ['admin', 'user'],
  },
];
