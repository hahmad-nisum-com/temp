import { RouteObject } from 'react-router-dom';

// Export types here
export type NavigationActionPayload = {
  path: string;
};
export type ConfigActionParam = boolean | string[] | number | null;

export type FilterConfig = {
  id: string | number;
  type: 'checkbox' | 'dropdown' | 'slider';
  action: (value: ConfigActionParam) => void;
  title: string;
  description?: string;
  options?: string[]; // For dropdown
  ranges?: [number, number]; // For slider
};

// Define the props for the SearchAndFilter component
export interface SearchAndFilterProps {
  onSearch: (query: string) => Promise<unknown[]>;
  getSuggestions?: (query: string) => Promise<string[]>;
  filterConfigs: FilterConfig[];
  placeholder?: string;
  debounceTime?: number;
  enableSuggestions?: boolean;
}

export type CustomRouterObject = RouteObject & {
  allowedRoles?: string[] | null;
};

export type RouterConfigs = {
  layout?: JSX.Element;
  routes: CustomRouterObject[];
};
