'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

interface Params {
  id: string;
}

interface EditCustomerProps {
  params: Promise<Params>;
}

export default function EditCustomer({ params }: EditCustomerProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const router = useRouter();
  
  const { id } = use(params);

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch customer data');
        }
        return res.json();
      })
      .then(data => {
        setForm(data);
      })
      .catch(error => {
        console.error('Error fetching customer:', error);
        // Set form ke default untuk mencegah crash
        setForm({ name: '', email: '', phone: '', address: '' });
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/customers/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/customers');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          required 
          placeholder="Nama" 
          className="w-full p-2 border rounded" 
        />
        <input 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          placeholder="Email" 
          className="w-full p-2 border rounded" 
        />
        <input 
          name="phone" 
          value={form.phone ?? ''} 
          onChange={handleChange} 
          placeholder="Telepon" 
          className="w-full p-2 border rounded" 
        />
        <input 
          name="address" 
          value={form.address ?? ''} 
          onChange={handleChange} 
          placeholder="Alamat" 
          className="w-full p-2 border rounded" 
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}