'use client';

import { useEffect, useState } from 'react';

interface Produk {
  name: string;
  price: number;
}

interface Transaksi {
  id_transaksi: string;
  nama_pembeli: string;
  tanggal_transaksi: string;
  total_harga: number;
  produk: Produk;
}

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function TransactionPage() {
  const [data, setData] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const res = await fetch('/api/transaction');
        const result = await res.json();
        console.log('Data transaksi:', result);
        setData(result);
      } catch (error) {
        console.error('Gagal memuat data transaksi', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaksi();
  }, []);

  // Skeleton baris untuk tabel
  const skeletonRows = Array(6).fill(null);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">Daftar Transaksi</h1>

      <section>
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-pink-200 text-pink-800">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID Transaksi</th>
                <th className="border border-gray-300 px-4 py-2">Produk</th>
                <th className="border border-gray-300 px-4 py-2">Nama Pembeli</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                <th className="border border-gray-300 px-4 py-2">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? skeletonRows.map((_, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-pink-50">
                      {Array(5)
                        .fill(null)
                        .map((__, i) => (
                          <td
                            key={i}
                            className="border border-gray-300 px-4 py-2"
                          >
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-full max-w-[80px]" />
                          </td>
                        ))}
                    </tr>
                  ))
                : data.map((transaksi) => (
                    <tr
                      key={transaksi.id_transaksi}
                      className="odd:bg-white even:bg-pink-50 hover:bg-pink-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">{transaksi.id_transaksi}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaksi.produk.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{transaksi.nama_pembeli}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formatTanggal(transaksi.tanggal_transaksi)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {transaksi.total_harga.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
