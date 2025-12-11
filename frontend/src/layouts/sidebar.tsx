'use client';

import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Home,
  FileText,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { filterSidebarItems } from '@/router/utils/helpers/sidebar.helper';

export interface SidebarItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  allowedRoles?: string[];
  subItems?: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Home className="h-4 w-4" />,
    allowedRoles: ['user', 'admin'],
  },
  {
    title: 'Users',
    path: '/user-management',
    icon: <Users className="h-4 w-4" />,
    allowedRoles: ['admin'],
  },
  {
    title: 'Products',
    path: '/products',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <BarChart3 className="h-4 w-4" />,
    allowedRoles: ['admin'],
  },
  {
    title: 'Documents',
    path: '/documents',
    icon: <FileText className="h-4 w-4" />,
    allowedRoles: ['user', 'admin'],
    subItems: [
      {
        title: 'Documents (user)',
        path: '/documentsuser',
        allowedRoles: ['admin'],
      },
      {
        title: 'Documents (admin)',
        path: '/documentsadmin',
        allowedRoles: ['admin'],
        subItems: [
          {
            title: 'Nested Documents',
            path: '/nestedDocuments',
            allowedRoles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />,
    allowedRoles: ['admin'],
  },
  {
    title: 'Permissions',
    path: '/permissions',
    icon: <ShieldCheck className="h-4 w-4" />,
    allowedRoles: ['admin'],
    subItems: [
      {
        title: 'Roles',
        path: '/permissions/roles',
        allowedRoles: ['admin'],
      },
      {
        title: 'Access Control',
        path: '/permissions/access',
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    title: 'Help & Support',
    path: '/help',
    icon: <HelpCircle className="h-4 w-4" />,
  },
];

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderMenuItems = (items: SidebarItem[]) => (
    <SidebarMenu>{filterSidebarItems(items).map((item) => renderMenuItem(item))}</SidebarMenu>
  );

  const renderMenuItem = (item: SidebarItem) => {
    return (
      <SidebarMenuItem key={item.path}>
        <SidebarMenuButton asChild isActive={isActive(item.path)}>
          <Link to={item.path}>
            {item?.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {item.subItems && item.subItems.length > 0 && (
          <SidebarMenuSub>{item.subItems.map((subItem) => renderMenuItem(subItem))}</SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <ShadcnSidebar>
      <SidebarHeader className="flex flex-col gap-4 px-4 py-2 pt-20">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Administrator</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(SIDEBAR_ITEMS.slice(0, 4))}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <span>Administration</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {renderMenuItems(SIDEBAR_ITEMS.slice(4, 6))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{renderMenuItems(SIDEBAR_ITEMS.slice(-1))}</SidebarFooter>
    </ShadcnSidebar>
  );
}
