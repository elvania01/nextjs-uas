'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCustomerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      router.push('/admin/customers')
    } else {
      alert('Gagal menambahkan customer')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Customer Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" 
          onChange={handleChange} 
          placeholder="Nama Customer" 
          required 
          className="border p-2 w-full" 
        />
        <input 
          name="email" 
          type="email" 
          onChange={handleChange} 
          placeholder="Email" 
          required 
          className="border p-2 w-full" 
        />
        <input 
          name="phone" 
          type="tel" 
          onChange={handleChange} 
          placeholder="Nomor Telepon" 
          className="border p-2 w-full" 
        />
        <textarea 
          name="address" 
          onChange={handleChange} 
          placeholder="Alamat" 
          className="border p-2 w-full h-20 resize-none" 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>
    </div>
  )
}