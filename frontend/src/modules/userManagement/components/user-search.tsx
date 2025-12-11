'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { actions as userManagementActions } from '../store/actions';
import { useDebounce } from '../hooks/useDebounce';

const { updateFilters } = userManagementActions;
export function UserSearch() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(updateFilters({ search: debouncedSearchTerm, page: 1 }));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('userManagement.search')}
        className="w-full bg-background pl-8 md:w-[300px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
