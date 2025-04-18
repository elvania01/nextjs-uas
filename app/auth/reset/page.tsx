'use client';

import React, { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert('Reset link sent! Please check your email.');
        setEmail('');
      } else {
        const data = await res.json();
        alert(data?.message || 'Failed to send reset link.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-500 flex flex-col items-center pt-6">
      <div className="mb-8">
        <div className="text-white font-bold text-2xl">Noona Florist</div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full p-2 rounded-md text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
