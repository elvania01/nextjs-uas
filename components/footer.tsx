"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Image
            src="/noona-logo.png" 
            alt="Noona Florist Logo"
            width={60}
            height={60}
            />
          <div className="text-xl font-bold">Noona Florist</div>
        
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/about-us" className="hover:text-gray-300 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Noona Florist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
