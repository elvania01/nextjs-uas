// app/admin/transactions/create/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Produk {
  id: string;
  name: string;
  [key: string]: any;
}

export default function CreateTransactionPage() {
  const router = useRouter();

  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [form, setForm] = useState({
    produkId: '',
    nama_pembeli: '',
    tanggal_transaksi: '',
    total_harga: 0,
  });

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProdukList(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'total_harga' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/transactions');
    } else {
      alert('Gagal menyimpan transaksi');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Transaksi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="produkId"
          value={form.produkId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih Produk</option>
          {produkList.map((produk) => (
            <option key={produk.id} value={produk.id}>
              {produk.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="nama_pembeli"
          value={form.nama_pembeli}
          onChange={handleChange}
          placeholder="Nama Pembeli"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="tanggal_transaksi"
          value={form.tanggal_transaksi}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="total_harga"
          value={form.total_harga.toString()}
          onChange={handleChange}
          placeholder="Total Harga"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
}