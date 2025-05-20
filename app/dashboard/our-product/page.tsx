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
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        setProducts(data);

        // Set default quantity 1 for each product
        const initialQuantities: Record<string, number> = {};
        data.forEach((product: Product) => {
          initialQuantities[product.id] = 1;
        });
        setBuyingQuantities(initialQuantities);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
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
              {isOwner && <div className="h-8 bg-gray-300 rounded mt-auto" />}
            </div>
          ))
        ) : (
          products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col"
            >
              <div className="relative w-full h-60 rounded-xl overflow-hidden cursor-pointer">
                {editingProductId === product.id ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setEditImage(ev.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full h-60 opacity-0 absolute top-0 left-0 cursor-pointer"
                    />
                    <Image
                      src={editImage || product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </>
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl"
                    onClick={() => startEditing(product)}
                    style={{ cursor: isOwner ? 'pointer' : 'default' }}
                  />
                )}
              </div>

              <div className="mt-4 flex flex-col flex-grow">
                {editingProductId === product.id ? (
                  <>
                    <input
                      type="text"
                      className="mb-2 border rounded px-2 py-1"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      placeholder="Product name"
                    />
                    <input
                      type="number"
                      className="mb-2 border rounded px-2 py-1"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({ ...editData, price: parseFloat(e.target.value) })
                      }
                      placeholder="Price"
                      min={0}
                    />
                    <textarea
                      className="mb-2 border rounded px-2 py-1 resize-none"
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      className="mb-2 border rounded px-2 py-1"
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      placeholder="Category"
                    />
                    <input
                      type="number"
                      className="mb-2 border rounded px-2 py-1"
                      value={editData.stock}
                      onChange={(e) =>
                        setEditData({ ...editData, stock: parseInt(e.target.value) })
                      }
                      placeholder="Stock"
                      min={0}
                    />
                    <button
                      onClick={() => saveEdit(product.id)}
                      className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-pink-700 font-semibold mb-1">Rp{product.price.toLocaleString()}</p>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-gray-500 text-xs mb-2">Category: {product.category}</p>
                    <p className="text-gray-500 text-xs mb-2">Stock: {product.stock}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() =>
                          setBuyingQuantities((prev) => {
                            const current = prev[product.id] || 1;
                            if (current > 1) {
                              return { ...prev, [product.id]: current - 1 };
                            }
                            return prev;
                          })
                        }
                        className="p-1 bg-pink-100 rounded"
                      >
                        <MinusIcon className="h-4 w-4 text-pink-500" />
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center border rounded"
                        min={1}
                        max={product.stock}
                        value={buyingQuantities[product.id] ?? 1}
                        onChange={(e) => {
                          let val = parseInt(e.target.value);
                          if (isNaN(val) || val < 1) val = 1;
                          else if (val > product.stock) val = product.stock;
                          setBuyingQuantities((prev) => ({ ...prev, [product.id]: val }));
                        }}
                      />
                      <button
                        onClick={() =>
                          setBuyingQuantities((prev) => {
                            const current = prev[product.id] || 1;
                            if (current < product.stock) {
                              return { ...prev, [product.id]: current + 1 };
                            }
                            return prev;
                          })
                        }
                        className="p-1 bg-pink-100 rounded"
                      >
                        <PlusIcon className="h-4 w-4 text-pink-500" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleBuy(product)}
                      className="bg-pink-500 text-white rounded px-4 py-2 mb-2 hover:bg-pink-600 transition"
                    >
                      Buy
                    </button>

                    {isOwner && (
                      <div className="flex gap-4 mt-auto">
                        <button
                          onClick={() => startEditing(product)}
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                        >
                          <PencilIcon className="h-5 w-5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" /> Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white rounded px-4 py-2 shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}
