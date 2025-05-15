'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: "w1",
    name: "Classic White Roses",
    image: "/images/wedding-white-roses.jpg",
    price: 500,
    description: "Elegant white roses perfect for weddings.",
    category: "wedding",
    stock: 15,
  },
  {
    id: "w2",
    name: "Pastel Romance",
    image: "/images/wedding-pastel.jpg",
    price: 650,
    description: "A pastel-themed bouquet for your dreamy wedding.",
    category: "wedding",
    stock: 15,
  },
  {
    id: "b1",
    name: "Colorful Birthday Bash",
    image: "/images/birthday-colorful.jpg",
    price: 400,
    description: "Celebrate birthdays with vibrant flowers.",
    category: "birthday",
    stock: 15,
  },
  {
    id: "b2",
    name: "Sunflower Surprise",
    image: "/images/birthday-sunflower.jpg",
    price: 450,
    description: "Bright sunflowers to light up the day.",
    category: "birthday",
    stock: 15,
  },
  {
    id: "a1",
    name: "Romantic Reds",
    image: "/images/anniversary-reds.jpg",
    price: 700,
    description: "Red roses to celebrate timeless love.",
    category: "anniversary",
    stock: 15,
  },
  {
    id: "a2",
    name: "Elegant Orchids",
    image: "/images/anniversary-orchids.jpg",
    price: 750,
    description: "Orchids to show your lasting affection.",
    category: "anniversary",
    stock: 15,
  },
  {
    id: "s1",
    name: "Graduation Glory",
    image: "/images/special-graduation.jpg",
    price: 500,
    description: "Celebrate milestones with floral pride.",
    category: "special",
    stock: 15,
  },
  {
    id: "s2",
    name: "New Baby Blooms",
    image: "/images/special-baby.jpg",
    price: 550,
    description: "Soft pastels for joyful beginnings.",
    category: "special",
    stock: 15,
  },
];

type Transaction = {
  id: string;
  productId: string;
  buyerName: string;
  date: string;
  total: number;
};

function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mostSoldProduct, setMostSoldProduct] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    setTransactions([
      { id: '1', productId: 'w1', buyerName: 'John Doe', date: '2025-05-01', total: 500 },
      { id: '2', productId: 'b2', buyerName: 'Jane Doe', date: '2025-05-02', total: 450 },
      { id: '3', productId: 's1', buyerName: 'Alice', date: '2025-05-03', total: 500 },
      { id: '4', productId: 'a1', buyerName: 'Bob', date: '2025-05-04', total: 700 },
    ]);

    const mostSold: Record<string, number> = transactions.reduce((acc, curr) => {
    acc[curr.productId] = acc[curr.productId] ? acc[curr.productId] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

    const totalRev = transactions.reduce((acc, curr) => acc + curr.total, 0);
    const totalProd = products.length;

    const mostSoldProductId = Object.keys(mostSold).reduce((a, b) => mostSold[a] > mostSold[b] ? a : b, '');
    const mostSoldProductName = products.find(p => p.id === mostSoldProductId)?.name || '';

    setTotalRevenue(totalRev);
    setTotalProducts(totalProd);
    setMostSoldProduct(mostSoldProductName);
  }, [transactions]); 

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      {/* Analytic Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl text-pink-500">${totalRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl text-pink-500">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Most Sold Product</h3>
          <p className="text-2xl text-pink-500">{mostSoldProduct}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search Products or Transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button className="ml-2 p-3 bg-pink-500 text-white rounded-md">
          <FiSearch />
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">${product.price}</td>
                <td className="px-4 py-2 border-b">{product.stock}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <FiEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Buyer Name</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => {
              const product = products.find((p) => p.id === transaction.productId);
              return (
                <tr key={transaction.id}>
                  <td className="px-4 py-2 border-b">{transaction.buyerName}</td>
                  <td className="px-4 py-2 border-b">{product?.name}</td>
                  <td className="px-4 py-2 border-b">${transaction.total}</td>
                  <td className="px-4 py-2 border-b">{transaction.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
