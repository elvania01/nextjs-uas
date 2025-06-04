'use client';

import { useRouter } from 'next/navigation';
import { FiTrash2 } from 'react-icons/fi';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <FiTrash2 />
    </button>
  );
}