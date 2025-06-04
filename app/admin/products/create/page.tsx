'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
      }),
    })

    if (res.ok) {
      router.push('/admin/products')
    } else {
      alert('Gagal menambahkan produk')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Nama Produk" required className="border p-2 w-full" />
        <input name="price" type="number" onChange={handleChange} placeholder="Harga" required className="border p-2 w-full" />
        <input name="stock" type="number" onChange={handleChange} placeholder="Stok" required className="border p-2 w-full" />
        <input name="image" onChange={handleChange} placeholder="URL Gambar" className="border p-2 w-full" />
        <input name="category" onChange={handleChange} placeholder="Kategori" className="border p-2 w-full" />
        <textarea name="description" onChange={handleChange} placeholder="Deskripsi" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Tambah</button>
      </form>
    </div>
  )
}