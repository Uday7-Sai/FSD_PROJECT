import React from 'react';
import { Clock, Star, Ticket } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          ₹{movie.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{movie.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{movie.genre}</p>
        <button
          onClick={() => onSelect(movie)}
          className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-3 rounded-lg hover:from-orange-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
        >
          <Ticket className="w-5 h-5" />
          Book Tickets
        </button>
      </div>
    </div>
  );
}