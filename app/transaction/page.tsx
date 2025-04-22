"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type Transaction = {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
};

    const useUser = () => {
    const [user, setUser] = useState<{ name: string; role: string } | null>({
      name: "Owner",
      role: "Owner",
    });
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        setIsChecking(false);
      }, []);
    
      return { user, isChecking };
    };

export default function TransactionPage() {
    const router = useRouter();
    const { user, isChecking } = useUser();

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      productName: 'Bouquet Mawar Merah',
      productImage: '/flower-gift-wrap-mockup.jpg',
      price: 250000,
      quantity: 2,
      total: 500000,
      buyerName: 'Budi Santoso',
      buyerEmail: 'budi@example.com',
      buyerPhone: '08123456789',
      date: '2023-05-15',
      status: 'completed'
    },
    {
      id: '2',
      productName: 'Buket Bunga Campur',
      productImage: '/our-product.jpg',
      price: 350000,
      quantity: 1,
      total: 350000,
      buyerName: 'Ani Wijaya',
      buyerEmail: 'ani@example.com',
      buyerPhone: '08234567890',
      date: '2023-05-16',
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
      if (!user || user.role !== 'Owner') {
        router.push('/login');
      }
    }, [user, router]);

    if (!user || user.role !== 'Owner') {
        return null;
    }

    const filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTransaction) {
      if (currentTransaction.id) {
        setTransactions(transactions.map(t => 
          t.id === currentTransaction.id ? currentTransaction : t
        ));
      } else {
        setTransactions([...transactions, {
          ...currentTransaction,
          id: Date.now().toString()
        }]);
      }
      setIsModalOpen(false);
      setCurrentTransaction(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
        <div className="flex gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentTransaction(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            <FiPlus /> Tambah Transaksi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembeli</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={transaction.productImage}
                        alt={transaction.productName}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Rp {transaction.price.toLocaleString()} × {transaction.quantity}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.buyerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.buyerEmail}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.buyerPhone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Total: Rp {transaction.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.date}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : transaction.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status === 'completed' ? 'Selesai' : 
                     transaction.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {currentTransaction ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.productName || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      productName: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.price || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      price: Number(e.target.value)
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.quantity || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      quantity: Number(e.target.value),
                      total: (currentTransaction?.price || 0) * Number(e.target.value)
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pembeli</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.buyerName || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      buyerName: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Pembeli</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.buyerEmail || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      buyerEmail: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon Pembeli</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.buyerPhone || ''}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      buyerPhone: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={currentTransaction?.status || 'pending'}
                    onChange={(e) => setCurrentTransaction({
                      ...currentTransaction || {} as Transaction,
                      status: e.target.value as 'completed' | 'pending' | 'cancelled'
                    })}
                    required
                  >
                    <option value="pending">Menunggu</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}