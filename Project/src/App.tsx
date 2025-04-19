import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Film, UserCircle2, AlertCircle, Ticket as TicketIcon } from 'lucide-react';
import { supabase } from './supabaseClient'; // Ensure supabase is correctly configured
import { movies, cities, theaters } from './data';
import { MovieCard } from './components/MovieCard';
import { SeatMap } from './components/SeatMap';
import { AuthModal } from './components/AuthModal';
import { TicketModal } from './components/TicketModal';
import { CitySelector } from './components/CitySelector';
import { TheaterSelector } from './components/TheaterSelector';
import { TicketHistory } from './components/TicketHistory';
import HomePage from './components/HomePage';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [user, setUser] = useState(null); // Store logged-in user here
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [showTicketHistory, setShowTicketHistory] = useState(false);
  const [userTickets, setUserTickets] = useState([]);
  const [showDropdownOpen, setShowDropdownOpen] = useState(false); // For dropdown menu

  const filteredTheaters = theaters.filter(theater => theater.cityId === selectedCity?.id);

  useEffect(() => {
    const fetchSession = async () => {
      const session = supabase.auth.session();
      if (session) {
        setUser(session.user); // Set the logged-in user
      }
    };

    fetchSession();

    // Listen for changes to authentication state
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user); // Set user data on login
      } else {
        setUser(null); // Set user to null on logout
      }
    });
  }, []);

  // Function to generate seats (Initially mark some seats as booked)
  const generateSeats = () => {
    const seats = [];
    for (let row = 0; row < 6; row++) {
      for (let num = 1; num <= 8; num++) {
        seats.push({
          id: `${String.fromCharCode(65 + row)}${num}`,
          row: String.fromCharCode(65 + row),
          number: num,
          isBooked: Math.random() < 0.3, // Randomly mark 30% of seats as booked initially
          isSelected: false,
        });
      }
    }
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());

  const handleSeatSelect = (seat) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (seat.isBooked) {
      setError('This seat is already booked.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (selectedSeats.length >= 5 && !seat.isSelected) {
      setError('Maximum 5 seats can be selected at once');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const updatedSeats = seats.map((s) =>
      s.id === seat.id ? { ...s, isSelected: !s.isSelected } : s
    );
    setSeats(updatedSeats); // Update the seats state
    setSelectedSeats(updatedSeats.filter((s) => s.isSelected)); // Update selected seats
  };

  const handleLogin = (email, name) => {
    setUser({ email, name });
    setShowAuthModal(false);
    const savedTickets = localStorage.getItem(`tickets_${email}`);
    if (savedTickets) {
      setUserTickets(JSON.parse(savedTickets));
    }
  };

  const handleBooking = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedTheater || selectedSeats.length === 0 || !selectedMovie) {
      setError('Please complete all selections before booking.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Mark selected seats as booked
    const updatedSeats = seats.map((s) =>
      selectedSeats.find((selectedSeat) => selectedSeat.id === s.id) ? { ...s, isBooked: true } : s
    );
    setSeats(updatedSeats); // Update the seats state

    const newTicket = {
      id: Math.random().toString(36).substr(2, 9),
      movieTitle: selectedMovie.title,
      showTime: selectedShowTime,
      seats: selectedSeats.map(s => s.id),
      totalPrice: selectedSeats.length * selectedMovie.price,
      purchaseDate: new Date().toLocaleString(),
      theater: selectedTheater.name,
      city: selectedCity?.name || '',
      qrCode: JSON.stringify({
        ticketId: Math.random().toString(36).substr(2, 9),
        movie: selectedMovie.title,
        time: selectedShowTime,
        seats: selectedSeats.map(s => s.id),
        theater: selectedTheater.name,
        city: selectedCity?.name
      })
    };

    const updatedTickets = [...userTickets, newTicket];
    setUserTickets(updatedTickets);
    localStorage.setItem(`tickets_${user.email}`, JSON.stringify(updatedTickets));
    setTicket(newTicket);
    setSelectedSeats([]); // Clear selected seats after booking
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedShowTime('');
    setSelectedSeats([]);
    setSelectedTheater(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserTickets([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={
          <div className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-4 shadow-lg">
              <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <Film className="w-8 h-8" />
                  <h1 className="text-2xl font-bold">FSD GRP 3</h1>
                </Link>
                <div className="flex items-center gap-4">
                  {user && (
                    <button
                      onClick={() => setShowTicketHistory(!showTicketHistory)}
                      className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
                    >
                      <TicketIcon className="w-5 h-5" />
                      <span>My Tickets</span>
                    </button>
                  )}
                  <div className="relative">
                    <button
                      onClick={() => {
                        if (!user) setShowAuthModal(true);
                        else setShowDropdownOpen(!showDropdownOpen);
                      }}
                      className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
                    >
                      <UserCircle2 className="w-6 h-6" />
                      <span>{user ? user.name : 'Sign In'}</span>
                    </button>

                    {user && showDropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md z-50">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <main className="container mx-auto px-4 py-8">
              {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {showTicketHistory && user ? (
                <div className="max-w-3xl mx-auto">
                  <button
                    onClick={() => setShowTicketHistory(false)}
                    className="mb-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    ← Back to movies
                  </button>
                  <TicketHistory tickets={userTickets} onViewTicket={setTicket} />
                </div>
              ) : !selectedMovie ? (
                <>
                  <CitySelector cities={cities} selectedCity={selectedCity} onSelectCity={setSelectedCity} />
                  {selectedCity && (
                    <TheaterSelector
                      theaters={filteredTheaters}
                      selectedTheater={selectedTheater}
                      onSelectTheater={setSelectedTheater}
                    />
                  )}
                  {selectedTheater && (
                    <>
                      <h2 className="text-3xl font-bold mb-2">Now Showing</h2>
                      <p className="text-gray-600 mb-8">Select a movie to book your tickets</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {movies.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <button
                    onClick={resetBooking}
                    className="mb-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    ← Back to movies
                  </button>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    {selectedMovie.trailerUrl && (
                      <div className="mb-6">
                        <iframe
                          width="100%"
                          height="350"
                          src={`${selectedMovie.trailerUrl}?autoplay=1&mute=1`}
                          title="Movie Trailer"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    )}

                    <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
                    <p className="text-gray-600 mb-4">
                      {selectedTheater?.name}, {selectedCity?.name}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Select Show Time</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMovie.showTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedShowTime(time)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              selectedShowTime === time
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedShowTime && (
                      <>
                        <h3 className="text-lg font-semibold mb-2">Select Seats (Max 5)</h3>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-r from-gray-300 to-gray-400 w-3/4 h-2 rounded-lg">
                              <div className="text-center text-sm text-gray-500 mt-2">Screen</div>
                            </div>
                          </div>
                          <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg">
                              Selected seats: {selectedSeats.map((s) => s.id).join(', ')}
                            </p>
                            <p className="text-xl font-bold">
                              Total: ₹{(selectedSeats.length * selectedMovie.price).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={handleBooking}
                            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </main>

            {showAuthModal && (
              <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
            )}

            {ticket && (
              <TicketModal ticket={ticket} onClose={() => {
                setTicket(null);
                resetBooking();
              }} />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
