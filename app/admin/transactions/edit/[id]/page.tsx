'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Produk = {
  id: string;
  name: string;
};

export default function EditTransactionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [formData, setFormData] = useState({
    produkId: '',
    nama_pembeli: '',
    tanggal_transaksi: '',
    total_harga: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProdukList);

    if (id) {
      fetch(`/api/transactions/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            produkId: data.produkId,
            nama_pembeli: data.nama_pembeli,
            tanggal_transaksi: data.tanggal_transaksi.slice(0, 10),
            total_harga: data.total_harga,
          });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/admin/transactions');
    } else {
      alert('Gagal mengedit transaksi');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Transaksi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="produkId"
          value={formData.produkId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Produk</option>
          {produkList.map((produk) => (
            <option key={produk.id} value={produk.id}>
              {produk.name}
            </option>
          ))}
        </select>

        <input
          name="nama_pembeli"
          value={formData.nama_pembeli}
          onChange={handleChange}
          placeholder="Nama Pembeli"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="tanggal_transaksi"
          type="date"
          value={formData.tanggal_transaksi}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="total_harga"
          type="number"
          value={formData.total_harga}
          onChange={handleChange}
          placeholder="Total Harga"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}