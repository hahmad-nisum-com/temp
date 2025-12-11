'use client';

import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LockKeyhole, Bell, ShieldCheck, UserCircle } from 'lucide-react';

export function ProfileNavigation() {
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

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2',
              location.pathname === item.href
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
  );
}
