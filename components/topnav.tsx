"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, TruckIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function TopNav() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm text-gray-600">

        {/* Info Links */}
        <div className="flex items-center space-x-6">
          <Link href="/store-location" className="flex items-center space-x-1 hover:underline">
            <MapPinIcon className="h-5 w-5" />
            <span>Store Location</span>
          </Link>
          <Link href="/tracking-order" className="flex items-center space-x-1 hover:underline">
            <TruckIcon className="h-5 w-5" />
            <span>Tracking Order</span>
          </Link>
          <Link href="/customer-service/page" className="flex items-center space-x-1 hover:underline">
            <PhoneIcon className="h-5 w-5" />
            <span>Customer Service</span>
          </Link>
        </div>

        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-2">
          <Image
            src="/noona-logo.png" 
            alt="Noona Florist Logo"
            width={24}
            height={24}
          />
          <span className="font-semibold text-gray-800">Noona Florist</span>
        </div>

      </div>
    </div>
  );
}
