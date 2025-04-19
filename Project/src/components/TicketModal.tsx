import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket } from '../types';
import { X } from 'lucide-react';

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketModal({ ticket, onClose }: TicketModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Your Ticket</h2>
          
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">{ticket.movieTitle}</h3>
            <p className="text-sm mb-2">Show Time: {ticket.showTime}</p>
            <p className="text-sm mb-2">Seats: {ticket.seats.join(', ')}</p>
            <p className="text-sm">Total: ₹{ticket.totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-center mb-6">
            <QRCodeSVG value={ticket.qrCode} size={200} />
          </div>

          <p className="text-sm text-gray-500">
            Present this QR code at the theater entrance
          </p>
        </div>
      </div>
    </div>
  );
}