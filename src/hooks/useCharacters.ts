import { useState, useEffect, useCallback } from 'react';
import type { Character } from '../types';

import { api } from '../services/api';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const loadCharacters = useCallback(async (pageNum: number, search: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.fetchCharacters(pageNum, search);
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters(page, searchQuery);
  }, [page, searchQuery, loadCharacters]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  return {
    characters,
    loading,
    error,
    page,
    totalPages,
    searchQuery,
    handleSearch,
    nextPage,
    prevPage,
  };
};