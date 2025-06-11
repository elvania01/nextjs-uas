import React from 'react';

export default function ProductTableSkeleton() {
  return (
    <div className="animate-pulse">

      {/* Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-100">
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Harga</th>
            <th className="px-4 py-2 text-left">Stok</th>
            <th className="px-4 py-2 text-left">Kategori</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="hover:bg-pink-50 border-t">
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-32" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-16" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <div className="h-6 w-6 bg-gray-300 rounded" />
                <div className="h-6 w-6 bg-gray-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
