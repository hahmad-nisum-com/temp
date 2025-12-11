export interface PricingFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: PricingFeature[];
  highlighted?: boolean;
}
