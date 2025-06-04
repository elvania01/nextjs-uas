'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Gagal menyimpan perubahan');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nama Produk"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Harga"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stok"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Kategori"
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="URL Gambar"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="w-full p-2 border rounded"
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