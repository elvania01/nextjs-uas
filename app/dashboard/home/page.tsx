"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiftIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import TopNav from '@/components/topnav';
import CategorySection from '@/app/categories/wedding/page';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleShopNow = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard/our-product'); 
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#fff8f9]">
      {/* Navbar */}
      <TopNav />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Hero Section */}
        <div className="relative bg-none rounded-1xl overflow-hidden shadow-2xl border-8 border-pink-100 mb-6">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-white-100 rounded-full flex items-center justify-center">
            <SparklesIcon className="h-10 w-10 text-pink-500" />
          </div>

          <div className="grid md:grid-cols-2">
            {/* Text */}
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-5xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                FIND FLOWERS THAT BLOOM WITH YOUR MOMENT
                <p className="font-pacifico text-pink mt-2">Explore a variety of beautifully designed flowers to make your moments special.</p>
              </h2>

              <button
                onClick={handleShopNow}
                disabled={isLoading}
                className={`mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center bg-pink-10 text-white">
                    <Spinner />
                    Redirecting...
                  </span>
                ) : (
                  <>
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingBagIcon className="h-6 w-6" />
                      <span>Product</span>
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Image */}
            <div className="relative h-65 md:h-78">
              <Image
                src="/flower-gift-wrap-mockup.jpg"
                alt="Floral Gift Wrap"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('/customers/ribbon-pattern.png')] bg-repeat-x" />
            </div>
          </div>
        </div>

        {/* Category Section */}
        </div>

      {/* Footer Pattern */}
      <div className="h-16 bg-[url('/floral-pattern.png')] bg-repeat-x bg-cover mt-6 border-t-4 border-pink-300" />
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
