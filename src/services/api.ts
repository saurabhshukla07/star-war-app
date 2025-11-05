// services/api.ts
import type { ApiResponse, Homeworld } from '../types';

const BASE_URL = 'https://akabab.github.io/starwars-api/api';

export const api = {
  async fetchCharacters(page: number = 1, search: string = ''): Promise<ApiResponse> {
    const url = search 
      ? `https://swapi.dev/api/people/?search=${encodeURIComponent(search)}&page=${page}`
      : `https://swapi.dev/api/people/?page=${page}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch characters');
    return await response.json() as ApiResponse;
  },

  async fetchHomeworld(url: string): Promise<Homeworld> {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch homeworld');
    return await response.json() as Homeworld;
  },

  // ✅ Fetch character image from Akabab Star Wars API
  async fetchCharacterImage(name: string): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/all.json`);
      if (!response.ok) throw new Error('Failed to fetch character images');

      const data: any[] = await response.json();
      const character = data.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );

      return character?.image || '/fallback.jpg';
    } catch (err) {
      console.error(err);
      return '/fallback.jpg';
    }
  }
};
