"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useCart from "@/app/lib/CartContext";
import { products as allProducts } from "@/app/lib/products";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Navbar() {
  const { cart } = useCart();
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fullCart = cart.map((item: CartItem) => {
    const product = allProducts.find((p) => p.id.toString() === item.id.toString());
    return {
      ...item,
      name: product?.name || "Unknown",
    };
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedUser = localStorage.getItem("user");

    if (loginStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      console.log("Parsed user:", userObj);
      console.log("USER ROLE:", userObj.role);
      if (userObj?.role) {
        setRole(userObj.role);
      }
    }

    setIsLoaded(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    setShowAccountDropdown(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (accountRef.current && !accountRef.current.contains(target)) {
        setShowAccountDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setShowCategory(false);
      }
      if (cartRef.current && !cartRef.current.contains(target)) {
        setShowCartPopup(false);
      }
    };

    if (showAccountDropdown || showCategory || showCartPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountDropdown, showCategory, showCartPopup]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

    return (
    <nav className="bg-pink-500 text-white relative">
      <div className="font-pacifico max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Left Navigation */}
        <div className="flex items-center space-x-4">
          {/* Dashboard with Dropdown */}
{role === "Owner" && (
  <div className="relative group">
    <Link
      href="/analytic"
      className="hover:bg-pink-600 px-2 py-1 rounded-md cursor-pointer inline-block"
    >
      Dashboard
    </Link>
    <div className="absolute z-10 hidden group-hover:block bg-white shadow-md rounded-md w-40 mt-1">
    </div>
  </div>
)}


          <Link href="/" className="hover:bg-pink-600 px-2 py-1 rounded-md">Home</Link>
          <Link href="/about-us" className="hover:bg-pink-600 px-2 py-1 rounded-md">About Us</Link>
          <Link href="/testimoni" className="hover:bg-pink-600 px-2 py-1 rounded-md">Testimoni</Link>
          {role === "Owner" && (
            <Link href="/transaction" className="hover:bg-pink-600 px-2 py-1 rounded-md">
              Transaction
            </Link>
          )}

          {/* Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="flex items-center hover:bg-pink-600 px-2 py-1 rounded-md"
            >
              Category
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {showCategory && (
              <div className="absolute top-10 bg-white text-pink-600 rounded-md shadow-lg py-2 w-56 z-10">
                <Link href="/categories/wedding" className="block px-4 py-2 hover:bg-pink-100">Wedding Bouquets</Link>
                <Link href="/categories/birthday" className="block px-4 py-2 hover:bg-pink-100">Birthday Bouquets</Link>
                <Link href="/categories/anniversary" className="block px-4 py-2 hover:bg-pink-100">Anniversary Bouquets</Link>
                <Link href="/categories/special-events" className="block px-4 py-2 hover:bg-pink-100">Special Events Bouquets</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          {/* Cart Icon */}
          <div className="relative cursor-pointer" ref={cartRef}>
            <ShoppingCartIcon
              onClick={() => setShowCartPopup(!showCartPopup)}
              className="h-6 w-6"
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold rounded-full px-1.5">
                {cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)}
              </span>
            )}
          </div>

          {showCartPopup && (
            <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg p-4 w-80 z-50">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">Cart Items</h3>
              {fullCart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {fullCart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Search */}
          <div className="flex items-center bg-white text-black rounded-full px-3 py-1 w-fit max-w-xs">
            <input
              type="text"
              placeholder="Find Flower..."
              className="bg-transparent text-sm placeholder-pink-300 text-pink-500 outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <MagnifyingGlassIcon
              className="h-5 w-5 ml-2 text-pink-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {/* Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  router.push("/auth/login");
                } else {
                  setShowAccountDropdown(!showAccountDropdown);
                }
              }}
              className="flex items-center hover:text-white cursor-pointer"
            >
              <UserCircleIcon className="h-6 w-6 mr-1" />
              <span>{isLoaded && isLoggedIn ? username : "My Account"}</span>
            </button>

            {isLoaded && showAccountDropdown && isLoggedIn && (
              <div className="absolute right-0 top-10 bg-white text-pink-600 rounded-md shadow-lg py-2 w-44 z-10">
                <Link
                  href={role.toLowerCase() === "owner" ? "/profile" : "/profile/customer"}
                  className="block px-4 py-2 hover:bg-pink-100"
                  onClick={() => setShowAccountDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
