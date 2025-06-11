"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import {
  ShoppingCartIcon,
  UserCircleIcon,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


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
      if (cartRef.current && !cartRef.current.contains(target)) {
        setShowCartPopup(false);
      }
    };

    if (showAccountDropdown || showCartPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountDropdown, showCartPopup]);

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
          {/* Dashboard */}
          {role === "Owner" && (
            <div className="relative group">
              <Link
                href="/analytic"
                className="hover:bg-pink-600 px-2 py-1 rounded-md cursor-pointer inline-block"
              >
                Dashboard
              </Link>
            </div>
          )}

          <Link href="/" className="hover:bg-pink-600 px-2 py-1 rounded-md">Home</Link>
          <Link href="/testimoni" className="hover:bg-pink-600 px-2 py-1 rounded-md">Testimoni</Link>
          <Link href="/about-us" className="hover:bg-pink-600 px-2 py-1 rounded-md">About Us</Link>
          {role === "Owner" && (
            <>
            </>
          )}
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

          {/* {showCartPopup && (
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
          )} */}

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
