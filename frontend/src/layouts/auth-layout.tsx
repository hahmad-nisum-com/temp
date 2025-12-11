import { LocalStorageKeys } from '@/modules/shared';
import '@/styles/globals.css';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
