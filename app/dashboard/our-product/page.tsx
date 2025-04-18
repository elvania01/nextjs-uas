'use client';

import { useState, useEffect } from 'react';
import { products as staticProducts } from '@/app/lib/products';
import {
  HeartIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from 'framer-motion';
import useCart from '@/app/lib/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function OurProductPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [isOwner, setIsOwner] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [toast, setToast] = useState('');
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
  });
  const [buyingQuantities, setBuyingQuantities] = useState<Record<string, number>>({});

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      setIsOwner(username === 'Owner');
    }
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'New Flower',
      price: 99,
      image: '/images/placeholder-flower.jpg',
      description: 'Beautiful flower',
      category: 'default',
    };
    setProducts((prev) => [newProduct, ...prev]);
    setToast('New product added!');
    setTimeout(() => setToast(''), 3000);
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    });
    setEditImage(null);
  };

  const saveEdit = (id: string) => {
    if (!editData.name || !editData.description || !editData.category) {
      alert('Please fill in all fields');
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...editData,
              image: editImage ?? product.image,
            }
          : product
      )
    );
    setEditingProductId(null);
    setEditImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setToast('Product updated!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleBuy = (product: Product) => {
    if (!localStorage.getItem('username')) {
      setShowLoginAlert(true);
      return;
    }
    const quantity = buyingQuantities[product.id] ?? 1;
    if (isNaN(quantity) || quantity < 1) return;
    addToCart({ ...product, quantity });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-purple-300 p-6 relative">
      <AnimatePresence>
        {showLoginAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full"
            >
              <h2 className="text-xl font-bold mb-2">Login Required</h2>
              <p className="mb-4">You must be logged in to buy a product.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLoginAlert(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowLoginAlert(false);
                    window.location.href = '/login';
                  }}
                  className="px-4 py-2 bg-pink-500 text-white rounded"
                >
                  Login Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center mb-6">
        <h1 className="font-pacifico text-4xl font-bold text-center bg-white/70 px-6 py-2 rounded-xl shadow">OUR PRODUCT</h1>
      </div>

      {isOwner && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" /> Add New Product
          </button>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 relative">
            <div
              onClick={() => router.push(`/products/${product.id}`)}
              className="cursor-pointer"
            >
              <Image
                src={product.image || '/images/placeholder-flower.jpg'}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg w-full h-60 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-pink-600 font-bold text-lg">${product.price}</p>
            </div>

            {!isOwner && (
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBuyingQuantities((prev) => ({
                        ...prev,
                        [product.id]: Math.max((prev[product.id] ?? 1) - 1, 1),
                      }))}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span>{buyingQuantities[product.id] ?? 1}</span>
                    <button
                      onClick={() => setBuyingQuantities((prev) => ({
                        ...prev,
                        [product.id]: (prev[product.id] ?? 1) + 1,
                      }))}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleBuy(product)}
                  className="w-full bg-pink-500 text-white py-2 rounded"
                >
                  Buy
                </button>
              </div>
            )}

            {isOwner && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => startEditing(product)}>
                  <PencilIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            )}

            {isOwner && editingProductId === product.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 p-4 rounded-2xl overflow-auto z-10">
                <h3 className="text-xl font-bold mb-2">Edit Product</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full mb-4 p-2 border rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setEditImage(imageUrl);
                    }
                  }}
                  className="w-full mb-2 p-2 border rounded bg-white"
                />
                {editImage && (
                  <Image
                    src={editImage}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-48 object-cover mb-2"
                  />
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setEditImage(null);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEdit(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}