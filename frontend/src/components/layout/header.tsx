'use client';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell, Moon, Search, Settings, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/use-theme';

import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would call a logout API
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Determine the current section based on the route
  const getCurrentSection = () => {
    const path = location.pathname;

    if (path.startsWith('/user-management')) {
      return {
        title: 'User Management',
        abbreviation: 'UM',
      };
    } else if (path.startsWith('/reports')) {
      return {
        title: 'Reports',
        abbreviation: 'RP',
      };
    } else if (path.startsWith('/documents')) {
      return {
        title: 'Documents',
        abbreviation: 'DC',
      };
    } else if (path.startsWith('/settings')) {
      return {
        title: 'Settings',
        abbreviation: 'ST',
      };
    } else if (path.startsWith('/permissions')) {
      return {
        title: 'Permissions',
        abbreviation: 'PM',
      };
    } else if (path.startsWith('/help')) {
      return {
        title: 'Help & Support',
        abbreviation: 'HS',
      };
    } else if (path.startsWith('/profile')) {
      return {
        title: 'Profile',
        abbreviation: 'PF',
      };
    } else {
      return {
        title: 'Dashboard',
        abbreviation: 'DB',
      };
    }
  };

  const currentSection = getCurrentSection();

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="md:hidden" />

          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {currentSection.abbreviation}
            </div>
            <span className="hidden font-bold md:inline-block">{currentSection.title}</span>
          </Link>
        </div>

        <div
          className={`${showSearch ? 'flex' : 'hidden'} md:flex flex-1 items-center gap-4 md:gap-6 md:ml-6`}
        >
          <div className="relative w-full md:w-64 lg:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('common.search')}
              className="w-full pl-8 md:w-64 lg:w-80"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer p-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-muted-foreground">
                        User John Doe has registered 5 minutes ago
                      </p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
