'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import DeleteButton from './DeleteButton';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <Link href="/admin/products/create" className="bg-pink-500 text-white px-4 py-2 rounded">
          + Tambah Produk
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
      />

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
          {filtered.map((product: any) => (
            <tr key={product.id} className="hover:bg-pink-50">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">Rp {product.price.toLocaleString()}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.category || '-'}</td>
              <td className="px-4 py-2 flex space-x-2">
                <Link href={`/admin/products/edit/${product.id}`} className="text-yellow-500 hover:text-yellow-700">
                  <FiEdit />
                </Link>
                <DeleteButton id={product.id} />
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">Tidak ada produk.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}