'use client';

import { FiTrash2 } from 'react-icons/fi';

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm('Yakin ingin menghapus data ini?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      window.location.reload(); 
    } else {
      alert('Gagal menghapus data.');
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