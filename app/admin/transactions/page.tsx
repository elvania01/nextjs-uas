'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import DeleteButton from './DeleteButton';

interface Produk {
  id: number;
  name: string;
}

interface Transaksi {
  id_transaksi: number;
  nama_pembeli: string;
  tanggal_transaksi: string;
  total_harga: number;
  produk: Produk | null;
}

export default function TransactionListPage() {
  const [transactions, setTransactions] = useState<Transaksi[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const filtered = transactions.filter((trx) =>
    trx.produk?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
        <Link
          href="/admin/transactions/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Tambah Transaksi
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari Transaksi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white border shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">Produk</th>
              <th className="px-4 py-2 border">Pembeli</th>
              <th className="px-4 py-2 border">Tanggal</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((trx) => (
                <tr key={trx.id_transaksi} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{trx.produk?.name ?? '-'}</td>
                  <td className="px-4 py-2 border">{trx.nama_pembeli}</td>
                  <td className="px-4 py-2 border">
                    {new Date(trx.tanggal_transaksi).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    Rp {trx.total_harga.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border flex space-x-2">
                    <Link
                      href={`/admin/transactions/edit/${trx.id_transaksi}`}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FiEdit />
                    </Link>
                    <DeleteButton id={trx.id_transaksi} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
