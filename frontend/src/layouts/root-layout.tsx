'use client';

import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/layouts/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LocalStorageKeys } from '@/modules/shared';
// import { Toaster } from '@/components/ui/toaster';

export default function RootLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle authentication check on client-side only
  if (isMounted) {
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-dvw">
        <Header />
        <div className="flex ">
          <Sidebar />
          <main className="flex-1  px-10 min-h-[calc(100vh-70px)] pt-20 bg-background">
            <Outlet /> {/* This is where your route components are rendered */}
          </main>
        </div>
        {/* <Toaster /> */}
      </div>
    </SidebarProvider>
  );
}
