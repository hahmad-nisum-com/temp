/* eslint-disable no-case-declarations */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check, ChevronDown, Filter, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ConfigActionParam, FilterConfig, SearchAndFilterProps } from '@/modules/shared';

export const SearchAndFilter = ({
  onSearch,
  getSuggestions,
  filterConfigs,
  placeholder = 'Search...',
  debounceTime = 300,
  enableSuggestions = true,
}: SearchAndFilterProps) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for active filters count
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  // State for tracking which filters are open
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  // State for filter values
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({});
  // State for search results
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // State for filter popover
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State for search suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // State for showing suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  // State for search focus
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Function to fetch suggestions
  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!enableSuggestions || !getSuggestions || query.trim() === '') {
        setSuggestions([]);
        return;
      }

      try {
        const results = await getSuggestions(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Suggestions error:', error);
        setSuggestions([]);
      }
    },
    [getSuggestions, enableSuggestions]
  );

  // Effect for fetching suggestions with less debounce time
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const handler = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 150); // Faster debounce for suggestions

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, fetchSuggestions]);

  // Function to handle search input change with debounce
  const debouncedSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      try {
        const results = await onSearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSearch]
  );

  // Effect for debouncing search
  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debouncedSearch, debounceTime]);

  // Function to handle filter changes
  const handleFilterChange = (filterId: string | number, value: ConfigActionParam) => {
    const config = filterConfigs.find((config) => config.id === filterId);

    if (config) {
      // Update filter values
      setFilterValues((prev) => {
        const newValues = { ...prev, [filterId]: value };

        // Count active filters
        let count = 0;
        Object.entries(newValues).forEach(([_, val]) => {
          if (
            (Array.isArray(val) && val.length > 0) ||
            (typeof val === 'boolean' && val) ||
            (typeof val === 'number' && val > 0) ||
            (typeof val === 'string' && val.trim() !== '')
          ) {
            count++;
          }
        });

        setActiveFiltersCount(count);
        return newValues;
      });

      // Call the action from config
      config.action(value);
    }
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilterValues({});
    setActiveFiltersCount(0);

    // Call all filter actions with default/empty values
    filterConfigs.forEach((config) => {
      let defaultValue;

      switch (config.type) {
        case 'checkbox':
          defaultValue = false;
          break;
        case 'dropdown':
          defaultValue = [];
          break;
        case 'slider':
          defaultValue = config.ranges ? config.ranges[1] : 0;
          break;
        default:
          defaultValue = null;
      }

      config.action(defaultValue);
    });
  };

  // Function to handle suggestion selection
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    debouncedSearch(suggestion);
  };

  // Function to render a specific filter based on its type
  const renderFilter = (config: FilterConfig) => {
    const { id, type, title, description } = config;

    switch (type) {
      case 'checkbox':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`checkbox-${id}`}
                checked={filterValues[id] === true}
                onCheckedChange={(checked) => {
                  handleFilterChange(id, checked === true);
                }}
              />
              <label
                htmlFor={`checkbox-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {title}
              </label>
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        );

      case 'dropdown':
        const options = config.options || [];
        const selectedValues = (filterValues[id] as string[]) || [];

        return (
          <div className="space-y-2">
            <Popover
              open={openFilter === `dropdown-${id}`}
              onOpenChange={(open) => {
                if (open) {
                  setOpenFilter(`dropdown-${id}`);
                } else {
                  setOpenFilter(null);
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                  {selectedValues.length > 0 ? `${title} (${selectedValues.length})` : title}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
                  <CommandList>
                    <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          value={option}
                          onSelect={() => {
                            const newSelectedValues = selectedValues.includes(option)
                              ? selectedValues.filter((item) => item !== option)
                              : [...selectedValues, option];

                            handleFilterChange(id, newSelectedValues);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                selectedValues.includes(option)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'opacity-50'
                              )}
                            >
                              {selectedValues.includes(option) && <Check className="h-3 w-3" />}
                            </div>
                            <span>{option}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        );

      case 'slider':
        const ranges = config.ranges || [0, 100];
        const value = (
          filterValues[id] !== undefined ? [filterValues[id]] : [ranges[0]]
        ) as number[];

        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">{title}</label>
                <span className="text-sm text-muted-foreground">{value[0]}</span>
              </div>
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            <Slider
              defaultValue={value}
              min={ranges[0]}
              max={ranges[1]}
              step={1}
              onValueChange={(newValue) => {
                handleFilterChange(id, newValue[0]);
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{ranges[0]}</span>
              <span>{ranges[1]}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search bar with filter button */}
      <div className="flex gap-3">
        <div
          className={cn(
            'relative flex-1 group transition-all duration-300',
            isSearchFocused &&
              'ring-2 ring-offset-2 ring-offset-background ring-primary/20 rounded-md'
          )}
        >
          <div
            className={cn(
              'relative flex items-center overflow-hidden rounded-md border bg-background shadow-sm transition-all duration-200',
              isSearchFocused ? 'border-primary/50' : 'border-input'
            )}
          >
            <Search
              className={cn(
                'absolute left-3 h-4 w-4 transition-colors duration-200',
                isSearchFocused ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <Input
              type="text"
              placeholder={placeholder}
              className="border-0 shadow-none pl-10 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  setShowSuggestions(true);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchQuery.trim() && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setIsSearchFocused(false);
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            {searchQuery && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full bg-muted/80 hover:bg-muted transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="sr-only">Clear</span>
                </Button>
              </div>
            )}
          </div>

          {/* Suggestions dropdown */}
          {enableSuggestions && showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg animate-in fade-in-0 zoom-in-95 duration-100">
              <Command>
                <CommandList>
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((suggestion, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleSelectSuggestion(suggestion)}
                        className="cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                      >
                        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{suggestion}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {/* Filter button with popover */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'relative h-10 w-10 rounded-md border shadow-sm transition-all duration-200 hover:bg-muted/80',
                isFilterOpen
                  ? 'border-primary/50 bg-primary/5 ring-2 ring-offset-2 ring-offset-background ring-primary/20'
                  : 'border-input'
              )}
            >
              <Filter
                className={cn(
                  'h-4 w-4 transition-colors duration-200',
                  isFilterOpen ? 'text-primary' : 'text-foreground'
                )}
              />
              {activeFiltersCount > 0 && (
                <Badge
                  className="absolute -right-1.5 -top-1.5 h-5 w-5 p-0 flex items-center justify-center text-[10px] shadow-md animate-in zoom-in-50 duration-200"
                  variant="destructive"
                >
                  {activeFiltersCount}
                </Badge>
              )}
              <span className="sr-only">Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-4 shadow-lg animate-in fade-in-0 zoom-in-95 duration-100"
            align="end"
            sideOffset={8}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs hover:bg-muted/80 transition-colors duration-150"
                  onClick={clearAllFilters}
                >
                  Clear all
                  <Badge className="ml-2 bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30 transition-colors duration-150">
                    {activeFiltersCount}
                  </Badge>
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {filterConfigs.map((config, index) => (
                <div key={config.id}>
                  {index > 0 && <Separator className="my-4" />}
                  {renderFilter(config)}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Results indicator */}
      {isLoading ? (
        <div className="text-sm text-muted-foreground animate-pulse">Loading results...</div>
      ) : (
        searchResults.length > 0 && (
          <div className="text-sm animate-in fade-in-50 duration-200">
            Found {searchResults.length} results
          </div>
        )
      )}
    </div>
  );
};
