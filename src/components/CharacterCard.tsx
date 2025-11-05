import React, { useState, useEffect } from 'react';
import { Users, Loader2 } from 'lucide-react';
import type { Character } from '../types/index.ts';
import { api } from '../services/api';

export const CharacterCard: React.FC<{ character: Character; onClick: () => void }> = ({
  character,
  onClick,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('/fallback.jpg');
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
  const loadImage = async () => {
    const url = await api.fetchCharacterImage(character.name);
    setImageUrl(url);
    setImageLoading(false);
  };
  loadImage();
}, [character.name]);


  const name = character.name;
  const isVillain = /vader|sidious|maul|palpatine|kylo/i.test(name);
  const hoverGlow = isVillain
    ? 'hover:shadow-[0_0_30px_rgba(255,0,0,0.8)]'
    : 'hover:shadow-[0_0_30px_rgba(0,255,120,0.8)]';

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transform transition-all duration-300 
        hover:scale-105 rounded-xl overflow-hidden 
        bg-gradient-to-b from-neutral-900 to-black border border-white/10 
        ${hoverGlow}`}
    >
      {/* Header */}
      <div className="p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 truncate tracking-wide">
          {character.name}
        </h3>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Users className="w-4 h-4" />
          <span>{character.species.length > 0 ? 'Alien' : 'Human'}</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        {imageLoading ? (
          <div className="w-full h-56 flex items-center justify-center bg-black/50">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={character.name}
            className="w-full h-56 object-contain brightness-90 contrast-125"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fallback.jpg';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      </div>
    </div>
  );
};