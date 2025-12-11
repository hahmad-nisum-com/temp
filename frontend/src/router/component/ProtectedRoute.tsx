import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles?: string[] | null | undefined;
}) {
  const roles = JSON.parse(localStorage.getItem('role') || '[]');

  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  const isAllowed = roles && allowedRoles.some((role) => roles.includes(role));

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
