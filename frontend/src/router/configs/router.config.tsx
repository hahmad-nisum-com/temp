import RootLayout from '@/layouts/root-layout';
import { authRoutes } from '@/modules/auth';
import { listRoutes } from '@/modules/list';
import { RouterConfigs } from '@/modules/shared';
import { userManagementRoutes } from '@/modules/userManagement';
import HomePage from '@/pages/home';
import { profileRoutes } from '@/modules/profile';

/**
 * Router configuration object
 * @type {RouterConfigs}
 * @property {JSX.Element} layout - The layout component for the routes
 * @property {CustomRouterObject[]} routes - An array of route objects
 * @description This object contains the configuration for the router, including the layout and routes for different sections of the application.
 * @example router config with layout 
 * ```
 * 
 export const authRoutes: RouterConfigs = {
   layout: <AuthLayout />,
   routes: [
     { path: 'login', element: <LoginPage /> },
     { path: 'forget-password', element: <ForgotPassword /> },
     { path: 'signup', element: <SignupPage /> },
     { path: 'reset-password', element: <ResetPassword /> },
   ],
 };
 * ```
 * adding route config to main router config
 * ```
 * export const routerConfigs: {[key: string]: RouterConfigs} = {
  "auth": authRoutes,
};
 * ```
 * @example router config without layout
 * ```
   export const userManagementRoutes: CustomRouterObject [] = [
     {
       path: '/user-management',
       element: <UserManagement />,
       allowedRoles: ['admin', 'user'],
     },
   ]
 * ```
  * @example adding route config to main router config
 * ```  
 export const routerConfigs: { [key: string]: RouterConfigs } = {
  auth: authRoutes,
  protectedAppRoutes: {
    layout: <RootLayout />,
    routes: [{ path: 'dashboard', element: <HomePage /> }, ...userManagementRoutes],
  },
};   
* ```
 */
export const routerConfigs: { [key: string]: RouterConfigs } = {
  auth: authRoutes,
  protectedAppRoutes: {
    layout: <RootLayout />,
    routes: [
      { path: 'dashboard', element: <HomePage /> },
      ...userManagementRoutes,
      ...listRoutes,
      ...profileRoutes,
    ],
  },
};
