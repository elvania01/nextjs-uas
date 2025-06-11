"use client";

import Link from "next/link";

export default function TopNav2() {
  return (
    <div className="py-6 flex justify-center">
      <nav className="flex gap-6">
        <Link
          href="/admin/products"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition"
        >
          Products
        </Link>
        <Link
          href="/admin/customers"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition"
        >
          Customers
        </Link>
        <Link
          href="/admin/transactions"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition"
        >
          Transactions
        </Link>
      </nav>
    </div>
  );
}
