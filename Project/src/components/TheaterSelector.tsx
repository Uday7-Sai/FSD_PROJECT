import React from 'react';
import { Theater } from '../types';
import { Building2 } from 'lucide-react';

interface TheaterSelectorProps {
  theaters: Theater[];
  selectedTheater: Theater | null;
  onSelectTheater: (theater: Theater) => void;
}

export function TheaterSelector({ theaters, selectedTheater, onSelectTheater }: TheaterSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-orange-600" />
        Select Theater
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {theaters.map((theater) => (
          <button
            key={theater.id}
            onClick={() => onSelectTheater(theater)}
            className={`
              p-4 rounded-lg transition-all text-left
              ${selectedTheater?.id === theater.id
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'}
            `}
          >
            <h3 className="font-semibold text-lg">{theater.name}</h3>
            <p className={selectedTheater?.id === theater.id ? 'text-orange-100' : 'text-gray-500'}>
              {theater.location} • {theater.screens} Screens
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}