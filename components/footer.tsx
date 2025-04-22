"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Image
            src="/noona-logo.png"
            alt="Noona Florist Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-2xl font-semibold tracking-wide">Noona Florist</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <Link href="/about-us" className="hover:text-gray-200 transition-colors duration-200">About Us</Link>
          <Link href="https://www.instagram.com" className="hover:text-gray-200 transition-colors duration-200">Instagram</Link>
          <Link href="/privacy-policy" className="hover:text-gray-200 transition-colors duration-200">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-gray-200 transition-colors duration-200">Terms of Service</Link>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-pink-300" />

        {/* Copyright */}
        <p className="text-xs text-center text-pink-100">&copy; {new Date().getFullYear()} Noona Florist. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
