import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-orange-500 to-yellow-400">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-50 text-white">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-yellow-300" />
          <span className="text-xl font-bold text-yellow-300">FSD GRP 3</span>
        </div>
        <ul className="flex gap-6 font-medium">
          
          <li><Link to="/movies" className="hover:text-yellow-300 transition">Now Showing</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center px-6 py-16 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to <span className="text-yellow-300">FSD GRP 3</span>
        </h1>
        <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl">
          A modern, full-stack Tollywood movie ticket booking platform. Explore movies, select your city & theatre,
          choose your seats, and get instant e-tickets with QR codes. All powered by Supabase.
        </p>

        <Link to="/movies">
          <button className="mt-8 bg-white text-pink-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Book Tickets Now
          </button>
        </Link>

        <div className="mt-10 text-sm text-white/60">
          Created by Team FSD • All rights reserved © 2025
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white bg-opacity-10 px-6 py-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-white drop-shadow">✨ Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">🎟️ Seamless Booking</h3>
            <p>Quickly browse movies by city or genre and book your seats in seconds with a beautiful UI.</p>
          </div>
          <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">📍 Location Based</h3>
            <p>Select from top Tollywood theaters based on your city — all dynamic and real-time.</p>
          </div>
          <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">📱 Instant QR Tickets</h3>
            <p>After booking, receive your QR-coded e-ticket instantly for easy check-ins.</p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">🔐 Supabase Powered Auth</h3>
            <p>Secure login and signup system with persistent user sessions and stored ticket history.</p>
          </div>
          <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">💸 Cashback & Offers</h3>
            <p>Get access to exclusive cashback deals and seasonal Tollywood movie promos!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
