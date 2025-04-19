import React from 'react';
import { City } from '../types';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
}

export function CitySelector({ cities, selectedCity, onSelectCity }: CitySelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-orange-600" />
        Select City
      </h2>
      <div className="flex flex-wrap gap-3">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
            className={`
              px-4 py-2 rounded-lg transition-all
              ${selectedCity?.id === city.id
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'}
            `}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}