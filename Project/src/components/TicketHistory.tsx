import React from 'react';
import { Ticket } from '../types';
import { Calendar, MapPin } from 'lucide-react';

interface TicketHistoryProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
}

export function TicketHistory({ tickets, onViewTicket }: TicketHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Your Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tickets booked yet</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer"
              onClick={() => onViewTicket(ticket)}
            >
              <h3 className="font-semibold text-lg mb-2">{ticket.movieTitle}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{ticket.showTime} • {new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{ticket.theater}, {ticket.city}</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm">Seats: {ticket.seats.join(', ')}</span>
                <span className="font-semibold">₹{ticket.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}