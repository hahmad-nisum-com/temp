import { NotFoundPage } from '@/pages/error/not-found';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { UnauthorizedPage } from '@/pages/error/unauthorized';
import { routerConfigs } from '../configs/router.config';

export const Router = () => {
  const token = localStorage.getItem('token');
  const { layout: authLayout, routes: authRoutes } = routerConfigs.auth;
  const { layout: protectedAppLayout, routes: protectedAppRoutes } =
    routerConfigs.protectedAppRoutes;
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      <Route path="/" element={authLayout}>
        {authRoutes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/" element={protectedAppLayout}>
        {protectedAppRoutes.map((route) => (
          <Route key={route.path} element={<ProtectedRoute allowedRoles={route.allowedRoles} />}>
            {/* Parent route with layout */}
            <Route path={route.path} element={route.element}>
              {/* Index route */}
              {route.children?.map((child) => (
                <Route
                  key={child.path || 'index'}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          </Route>
        ))}
      </Route>
      <Route path="unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
