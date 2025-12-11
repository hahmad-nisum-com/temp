import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { name, category, price, image, rating, isNew, discount } = product;

  // Calculate discounted price if applicable
  const finalPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-md">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(name)}`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {discount && <Badge variant="destructive">-{discount}%</Badge>}
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold">${finalPrice.toFixed(2)}</span>
            {discount && (
              <span className="text-xs text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <Button
            size="sm"
            className="h-8 rounded-full px-3 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onAddToCart?.(product)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
