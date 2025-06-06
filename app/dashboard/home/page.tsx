"use client";

import { Card } from "app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GiftIcon, ShoppingBagIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TopNav from "@/components/topnav";
import CategorySection from "@/app/categories/wedding/page";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleShopNow = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard/our-product");
    }, 700);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#fff8f9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Hero Section */}
        <motion.div
          className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-8 border-pink-100 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-white rounded-full flex items-center justify-center border border-pink-200 shadow-md">
            <SparklesIcon className="h-8 w-8 text-pink-500" />
          </div>

          <div className="grid md:grid-cols-2">
            {/* Text */}
            <div className="p-12 flex flex-col justify-center">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-pink-700 mb-4 leading-snug"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                FIND FLOWERS THAT BLOOM <br className="hidden md:block" /> WITH YOUR MOMENT
              </motion.h2>

              <motion.p
                className="mt-4 text-lg text-gray-600 leading-relaxed"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Discover beautifully crafted bouquets for weddings, birthdays, anniversaries, and more. Let your feelings bloom with our floral creations.
              </motion.p>

              <motion.button
                onClick={handleShopNow}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-8 w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform shadow-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner />
                    Redirecting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBagIcon className="h-5 w-5" />
                    <span>Shop Now</span>
                  </span>
                )}
              </motion.button>
            </div>

            {/* Image */}
            <motion.div
              className="relative w-full h-72 md:h-96"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Image
                src="/flower-gift-wrap-mockup.jpg"
                alt="Floral Gift Wrap"
                fill
                className="object-cover rounded-r-xl"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-[url('/customers/ribbon-pattern.png')] bg-repeat-x" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer Pattern */}
      <div className="h-16 bg-[url('/floral-pattern.png')] bg-repeat-x bg-cover mt-6 border-t-4 border-pink-300" />
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
