import React, { useState, useCallback, useEffect } from 'react';
import { SearchAndFilter } from '@/components/ui/search_filter';
import { ProductGrid } from '../components';

import { sampleProducts } from '../mocks';
import { Product } from '../types';
import { ConfigActionParam } from '@/modules/shared';

export function ProductListing() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);

  // Mock search function
  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const results = sampleProducts.filter((product) => {
        // Apply search filter if query exists
        const matchesSearch =
          query === '' ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase());

        // Apply category filter if any categories are selected
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);

        // Apply price filter
        const matchesPrice = product.price <= maxPrice;

        // Apply in-stock filter (just a mock implementation)
        const matchesStock = !inStockOnly || product.id % 2 === 0; // Mock in-stock check

        return matchesSearch && matchesCategory && matchesPrice && matchesStock;
      });

      setFilteredProducts(results);
      setIsLoading(false);

      return results;
    },
    [inStockOnly, selectedCategories, maxPrice]
  );

  // Mock suggestions function
  const handleGetSuggestions = useCallback(async (query: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    const allSuggestions = [
      ...sampleProducts.map((p) => p.name),
      ...Array.from(new Set(sampleProducts.map((p) => p.category))),
    ];

    return allSuggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, []);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    // In a real app, you would use a proper toast library
    alert(`Added ${product.name} to cart`);
  };

  // Filter configurations
  const filterConfigs = [
    {
      id: 'inStock',
      type: 'checkbox' as const,
      action: (value: ConfigActionParam) => setInStockOnly(value as boolean),
      title: 'In Stock Only',
      description: 'Show only products that are currently in stock',
    },
    {
      id: 'categories',
      type: 'dropdown' as const,
      action: (value: ConfigActionParam) => setSelectedCategories(value as string[]),
      title: 'Categories',
      description: 'Filter by product category',
      options: Array.from(new Set(sampleProducts.map((p) => p.category))),
    },
    {
      id: 'price',
      type: 'slider' as const,
      action: (value: ConfigActionParam) => setMaxPrice(value as number),
      title: 'Max Price',
      description: 'Set maximum price',
      ranges: [0, 200],
    },
  ];

  useEffect(() => {
    // Initial search with empty query but applying current filters
    handleSearch('');
  }, [handleSearch, inStockOnly, selectedCategories, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop Products</h1>

      <div className="mb-8">
        <SearchAndFilter
          onSearch={handleSearch}
          getSuggestions={handleGetSuggestions}
          filterConfigs={filterConfigs}
          placeholder="Search products..."
          enableSuggestions={true}
        />
      </div>

      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
      />
    </div>
  );
}
