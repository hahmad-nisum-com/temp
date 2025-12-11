import { RouteObject } from 'react-router-dom';
import { ProductListing } from './pages';

export const listRoutes: RouteObject[] = [
  {
    path: '/products',
    element: <ProductListing />,
  },
];
