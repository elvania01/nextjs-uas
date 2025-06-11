'use client';

import React from 'react';

export default function TransactionTableSkeleton() {
  return (
    <div className="animate-pulse p-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border text-left">Produk</th>
              <th className="px-4 py-2 border text-left">Pembeli</th>
              <th className="px-4 py-2 border text-left">Tanggal</th>
              <th className="px-4 py-2 border text-left">Total</th>
              <th className="px-4 py-2 border text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </td>
                <td className="px-4 py-2 border">
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </td>
                <td className="px-4 py-2 border">
                  <div className="h-4 bg-gray-200 rounded w-28" />
                </td>
                <td className="px-4 py-2 border">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </td>
                <td className="px-4 py-2 border flex space-x-2">
                  <div className="h-6 w-6 bg-gray-300 rounded" />
                  <div className="h-6 w-6 bg-gray-300 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
