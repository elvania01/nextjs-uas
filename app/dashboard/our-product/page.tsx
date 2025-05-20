'use client';

import { useState, useEffect } from 'react';
import {
  HeartIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useCart from '@/app/lib/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

export default function OurProductPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
    stock: 0,
  });
  const [buyingQuantities, setBuyingQuantities] = useState<Record<string, number>>({});

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      setIsOwner(username === 'Owner');
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'New Flower',
      price: 99,
      image: '/images/placeholder-flower.jpg',
      description: 'Beautiful flower',
      category: 'default',
      stock: 15,
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
      stock: product.stock,
    });
    setEditImage(null);
  };

  const saveEdit = (id: string) => {
    if (!editData.name || !editData.description.trim() || !editData.category.trim()) {
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
    if (isNaN(quantity) || quantity < 1 || quantity > product.stock) {
      alert('Invalid quantity');
      return;
    }

    addToCart({ ...product, quantity });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(''), 3000);
  };

  function handleDelete(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setToast('Product deleted!');
      setTimeout(() => setToast(''), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6 relative">
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
                    window.location.href = '/auth/login';
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

            {/* Title and Add Button */}
      <div className="relative flex items-center bg-pink-200 mb-6 px-6 py-2">
        {loading ? (
          <>
            <div className="bg-gray-300 rounded-xl w-48 h-12 animate-pulse mx-auto" />
            {isOwner && <div className="bg-gray-300 rounded-full w-36 h-10 animate-pulse absolute right-6" />}
          </>
        ) : (
          <>
            <h1 className="font-pacifico text-4xl font-bold text-center bg-white/80 px-6 py-2 rounded-xl shadow absolute left-1/2 transform -translate-x-1/2">
              OUR PRODUCT
            </h1>
            {isOwner && (
              <button
                onClick={handleAddProduct}
                className="ml-auto bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition z-10"
                style={{ position: 'relative' }}
              >
                <PlusIcon className="h-5 w-5" /> Add New Product
              </button>
            )}
          </>
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          // Loading Skeleton Cards
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col animate-pulse"
            >
              <div className="bg-gray-300 rounded-lg w-full h-60 mb-4" />
              <div className="h-6 bg-gray-300 rounded mb-2" />
              <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
              {isOwner && <div className="h-4 bg-gray-300 rounded mb-1 w-1/2" />}
              {isOwner && <div className="h-10 bg-gray-300 rounded mb-2" />}
              <div className="h-4 bg-gray-300 rounded w-1/3" />
            </div>
          ))
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 relative flex flex-col"
            >
              <div
                onClick={() => router.push(`/products/${product.id}`)}
                className="cursor-pointer flex-grow"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg w-full h-60 object-cover"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-pink-600 font-bold text-lg">${product.price}</p>

                {isOwner && (
                  <>
                    <p className="text-xs text-red-600">ID Produk: {product.id}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
                  </>
                )}

                <p className="text-gray-500 text-sm mt-1">
                  {product.stock > 0 ? (
                    `Stock: ${product.stock}`
                  ) : (
                    <span className="text-red-500 font-semibold">Out of Stock</span>
                  )}
                </p>
              </div>

              {!isOwner && product.stock > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setBuyingQuantities((prev) => ({
                            ...prev,
                            [product.id]: Math.max((prev[product.id] ?? 1) - 1, 1),
                          }))
                        }
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span>{buyingQuantities[product.id] ?? 1}</span>
                      <button
                        onClick={() =>
                          setBuyingQuantities((prev) => ({
                            ...prev,
                            [product.id]: Math.min(
                              (prev[product.id] ?? 1) + 1,
                              product.stock
                            ),
                          }))
                        }
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy(product)}
                    className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
                  >
                    Buy
                  </button>
                </div>
              )}

              {isOwner && editingProductId === product.id && (
                <div className="mt-4 flex flex-col gap-2">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border rounded p-2"
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, price: Number(e.target.value) }))
                    }
                    className="border rounded p-2"
                    placeholder="Price"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="border rounded p-2"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="border rounded p-2"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={editData.stock}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, stock: Number(e.target.value) }))
                    }
                    className="border rounded p-2"
                    placeholder="Stock"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(product.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProductId(null)}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isOwner && editingProductId !== product.id && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => startEditing(product)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
