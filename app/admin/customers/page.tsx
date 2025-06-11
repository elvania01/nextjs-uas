'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import DeleteButton from './DeleteButton';
import CustomerSkeleton from '@/components/CustomerSkeleton';
import Pagination from '@/components/Pagination';
import TopNav2 from "@/components/topnav2"; // Pastikan path ini sesuai dengan struktur proyekmu

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  // Filter berdasarkan pencarian
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedCustomers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset halaman ke 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-6">
      {/* TOPNAV2 di bagian atas */}
      <div className="flex justify-center mb-6">
        <TopNav2 />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Pelanggan</h1>
        <Link href="/admin/customers/create" className="bg-pink-500 text-white px-4 py-2 rounded">
          + Tambah Pelanggan
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari pelanggan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-100">
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Telepon</th>
            <th className="px-4 py-2 text-left">Alamat</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <CustomerSkeleton />
          ) : paginatedCustomers.length > 0 ? (
            paginatedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-pink-50">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone || '-'}</td>
                <td className="px-4 py-2">{customer.address || '-'}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link href={`/admin/customers/edit/${customer.id}`} className="text-yellow-500 hover:text-yellow-700">
                    <FiEdit />
                  </Link>
                  <DeleteButton id={customer.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Tidak ada pelanggan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
