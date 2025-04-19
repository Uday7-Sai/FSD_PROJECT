import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Make sure supabaseClient is configured correctly
import { X } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, name: string) => void;
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign-up or Sign-in

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // Sign-up logic
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setMessage(`Failed to sign up: ${error.message}`);
        } else {
          // After sign-up, show a message but don't log in the user yet
          setMessage('Sign up successful! Check your email for verification.');
          
          // The user will need to confirm their email before they can log in
        }
      } else {
        // Sign-in logic
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(`Failed to sign in: ${error.message}`);
        } else if (data.session && data.user) {
          setMessage('Sign in successful!');
          
          // After sign-in, update their profile with the full name
          const { error: updateError } = await supabase.auth.updateUser({
            data: { full_name: name },
          });

          if (updateError) {
            setMessage(`Failed to update profile: ${updateError.message}`);
            return;
          }

          onLogin(data.user.email ?? '', data.user.user_metadata?.full_name ?? ''); // Pass the name
          onClose(); // Close modal after login
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>

          {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
