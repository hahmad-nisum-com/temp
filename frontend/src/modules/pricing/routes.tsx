import { RouteObject } from 'react-router-dom';
import PricingPage from './pages/pricing-page';

export const pricingRoutes: RouteObject[] = [
  {
    path: '/pricing',
    element: <PricingPage />,
  },
];
