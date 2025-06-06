'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5'; 

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      {/* Tombol Kembali */}
      <div className="absolute top-5 left-5">
        <button
          onClick={() => window.history.back()}
          className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-200"
        >
          <IoArrowBack className="h-6 w-6" />
        </button>
      </div>

      <div className="text-center absolute top-20">
        <Image
          src="/noona-logo.png"
          alt="Noona Logo"
          width={50}
          height={50}
          className="mx-auto mb-2"
        />
        <div className="text-white font-pacifico font-bold text-2xl">Noona Florist</div>
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
