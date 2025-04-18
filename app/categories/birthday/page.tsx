"use client";

import Image from 'next/image';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function SpecialEventCategory() {
  const products = [
    { id: 1, name: "Graduation Surprise", image: "/products/special-graduation.jpg", price: "Rp 200.000" },
    { id: 2, name: "Congrats Flowers Set", image: "/products/special-congrats.jpg", price: "Rp 230.000" },
  ];

  const addToCart = (product: any) => {
    console.log("Add to Cart:", product);
  };

  const addToWishlist = (product: any) => {
    console.log("Add to Wishlist:", product);
  };

  return (
    <div className="p-8">
      <h1 className="font-pacifico text-3xl font-bold text-pink-600 mb-6">Special Event Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4 text-center">
            <Image src="/our-product.jpg" alt={product.name} width={300} height={300} className="mx-auto rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-pink-500 mt-2">{product.price}</p>
            <div className="flex justify-center mt-4 space-x-3">
              <button onClick={() => addToCart(product)} className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
                <ShoppingCartIcon className="h-5 w-5 mr-2" /> Add to Cart
              </button>
              <button onClick={() => addToWishlist(product)} className="flex items-center px-4 py-2 border border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition">
                <HeartIcon className="h-5 w-5 mr-2" /> Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
