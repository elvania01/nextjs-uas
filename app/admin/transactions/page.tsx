'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import DeleteButton from './DeleteButton';
import TransactionTableSkeleton from 'components/TransactionTableSkeleton';
import Pagination from '@/components/Pagination';
import TopNav2 from '@/components/topnav2'; // Pastikan path sesuai

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = transactions.filter((trx) =>
    trx.produk?.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedTransactions = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      {/* TopNav2 di bagian atas */}
      <div className="flex justify-center mb-6">
        <TopNav2 />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
        <Link
          href="/admin/transactions/create"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          + Tambah Transaksi
        </Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari Transaksi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
      />

      {/* Table */}
      {loading ? (
        <TransactionTableSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border shadow">
            <thead className="bg-pink-100">
              <tr>
                <th className="px-4 py-2 border">Produk</th>
                <th className="px-4 py-2 border">Pembeli</th>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((trx) => (
                  <tr key={trx.id_transaksi} className="hover:bg-pink-50">
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
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
