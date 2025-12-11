'use client';

import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserCircle, LockKeyhole, ShieldCheck, Bell } from 'lucide-react';

export function ProfileLayout() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      title: t('profile.navigation.profile'),
      href: '/profile',
      icon: <UserCircle className="h-4 w-4" />,
    },
    {
      title: t('profile.navigation.changePassword'),
      href: '/profile/change-password',
      icon: <LockKeyhole className="h-4 w-4" />,
    },
    {
      title: t('profile.navigation.security'),
      href: '/profile/security',
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      title: t('profile.navigation.preferences'),
      href: '/profile/preferences',
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  // Helper function to check if a route is active
  const isActive = (path: string) => {
    // Handle index route matching
    if (path === '/profile') {
      return location.pathname === path || location.pathname === path + '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Left sidebar */}
        <div className="md:col-span-3">
          <div className="space-y-6 sticky top-24">
            {/* Navigation */}
            <Card className="border-none shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2',
                      isActive(item.href)
                        ? 'bg-primary/5 border-l-primary text-primary'
                        : 'border-l-transparent hover:bg-muted/50 hover:border-l-muted-foreground/20'
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </Card>
          </div>
        </div>

        {/* Main content area - renders the child route */}
        <div className="md:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
