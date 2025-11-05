import React, { useState, useEffect } from 'react';
import { X, Globe, Loader2 } from 'lucide-react';
import type { Character, Homeworld } from '../types/index.ts';
import { api } from '../services/api';
import { formatDate, formatHeight, formatMass, formatPopulation } from '../utils/formatters';

export const CharacterModal: React.FC<{ character: Character; onClose: () => void }> = ({
  character,
  onClose,
}) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeworld = async () => {
      try {
        const data = await api.fetchHomeworld(character.homeworld);
        setHomeworld(data);
      } catch {
        console.error('Failed to load homeworld');
      } finally {
        setLoading(false);
      }
    };
    loadHomeworld();
  }, [character.homeworld]);

  const isVillain = /vader|sidious|maul|palpatine|kylo/i.test(character.name);
  const accent = isVillain ? 'from-red-600 to-black' : 'from-green-600 to-black';

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-black/90 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${accent} p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
          <p className="text-sm opacity-90 tracking-wider">Character Details</p>
        </div>

        {/* Info */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Height" value={formatHeight(character.height)} />
            <Info label="Mass" value={formatMass(character.mass)} />
            <Info label="Birth Year" value={character.birth_year} />
            <Info label="Date Added" value={formatDate(character.created)} />
            <Info
              label="Films"
              value={`${character.films.length} film${character.films.length !== 1 ? 's' : ''}`}
            />
          </div>

          {/* Homeworld */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-white" />
              <h3 className="text-xl font-bold">Homeworld</h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : homeworld ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Name" value={homeworld.name} />
                <Info label="Terrain" value={homeworld.terrain} />
                <Info label="Climate" value={homeworld.climate} />
                <Info label="Population" value={formatPopulation(homeworld.population)} />
              </div>
            ) : (
              <p className="text-gray-400">Failed to load homeworld data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);