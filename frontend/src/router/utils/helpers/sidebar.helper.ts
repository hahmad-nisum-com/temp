import { SidebarItem } from '@/layouts/sidebar';
import { LocalStorageKeys } from '@/modules/shared';

export const filterSidebarItems = (items: SidebarItem[]): SidebarItem[] => {
  return items
    .filter((item) => hasAccess(item.allowedRoles)) // Filter parent items based on their allowed roles
    .map((item) => {
      // Filter the sub-items based on the allowed roles of the parent item
      const subItems = item.subItems ? filterSidebarItems(item.subItems) : undefined;

      return {
        ...item,
        subItems: subItems && subItems.length > 0 ? subItems : undefined,
      };
    });
};

const hasAccess = (allowedRoles?: string[]) => {
  const rolesFromStorage = localStorage.getItem(LocalStorageKeys.ROLES);
  const userRoles: string[] = rolesFromStorage ? JSON.parse(rolesFromStorage) : [];

  const isAuthenticated = !!localStorage.getItem('token');
  if (!allowedRoles) return isAuthenticated;
  return allowedRoles.some((role) => userRoles.includes(role));
};
