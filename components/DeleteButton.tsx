'use client';
import { useRouter } from 'next/navigation';

type Props = { id: string; resource: string };
export default function DeleteButton({ id, resource }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirm = window.confirm('Yakin ingin menghapus?');
    if (!confirm) return;
    await fetch(`/api/${resource}/${id}`, { method: 'DELETE' });
    router.refresh();
  };
  return <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>;
}