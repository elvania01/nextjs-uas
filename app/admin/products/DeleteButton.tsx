'use client';

import { FiTrash2 } from 'react-icons/fi';

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm('Yakin ingin menghapus produk ini?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      window.location.reload(); // reload untuk update data
    } else {
      alert('Gagal menghapus produk.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      <FiTrash2 />
    </button>
  );
}