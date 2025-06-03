'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCustomer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/customers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/customers');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} required placeholder="Nama" className="w-full p-2 border rounded" />
        <input name="email" type="email" onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="phone" onChange={handleChange} placeholder="Telepon" className="w-full p-2 border rounded" />
        <input name="address" onChange={handleChange} placeholder="Alamat" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </div>
  );
}