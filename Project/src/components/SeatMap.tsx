import React from 'react';
import { Seat } from '../types';

interface SeatMapProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export function SeatMap({ seats, onSeatSelect }: SeatMapProps) {
  return (
    <div>
      <div className="flex gap-4 justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white border border-gray-300"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-blue-600"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-gray-300"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-2 p-4">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => !seat.isBooked && onSeatSelect(seat)}
            disabled={seat.isBooked}
            className={`
              w-8 h-8 rounded-t-sm
              ${seat.isBooked 
                ? 'bg-gray-300 cursor-not-allowed' 
                : seat.isSelected 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white hover:bg-blue-100 border border-gray-300'}
              flex items-center justify-center
              text-sm font-medium
              transition-colors
            `}
          >
            {seat.id}
          </button>
        ))}
      </div>
    </div>
  );
}