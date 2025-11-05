import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import type { Character } from '../types';
import './App.css';

import { useCharacters } from './hooks/useCharacters';
import { SearchBar } from './components/SearchBar';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';

const App: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const {
    characters,
    loading,
    error,
    page,
    totalPages,
    searchQuery,
    handleSearch,
    nextPage,
    prevPage,
  } = useCharacters();

  return (
    <div className="min-h-screen bg-black text-white font-[Orbitron] overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-widest drop-shadow-[0_0_8px_#ff0000]">
            STAR WARS CHARACTERS
          </h1>
          <p className="text-gray-300 text-lg tracking-wide">
            Explore the galaxy far, far away...
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-20 h-1 bg-green-400 shadow-[0_0_10px_#00ff7f]" />
            <div className="w-20 h-1 bg-red-500 shadow-[0_0_10px_#ff073a]" />
          </div>
        </header>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={handleSearch} />

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3 text-white">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-green-400" />
          </div>
        ) : (
          <>
            {/* Character Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              ))}
            </div>

            {/* Empty State */}
            {characters.length === 0 && (
              <div className="text-center py-20 text-gray-300">
                <p className="text-xl">No characters found</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="px-6 py-3 rounded-lg font-semibold bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff7f] disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg font-bold text-white tracking-wider">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="px-6 py-3 rounded-lg font-semibold bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_#ff073a] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
