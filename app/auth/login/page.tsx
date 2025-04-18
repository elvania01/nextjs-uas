"use client";

import { useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaSeedling } from "react-icons/fa"; 

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "1@gmail.com" && password === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "Owner");
      localStorage.setItem("justLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email, role: "Owner" }));
      router.push("/");
    } else if (email === "2@gmail.com" && password === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "Customer");
      localStorage.setItem("justLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email, role: "Customer" }));
      router.push("/");
    } else {
      setErrorMessage("Email atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="text-center absolute top-20">
      <Image
        src="/noona-logo.png"
        alt="Noona Logo"
        width={50}
        height={50}
        className="mx-auto mb-2"
      />
        <h1 className="text-white text-2xl font-bold tracking-wide">WELCOME, OUR CUSTOMER</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-96 mt-40">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-pink-700">Log In</h2>
          {errorMessage && (
            <p className="mt-2 bg-yellow-200 text-yellow-800 py-1 px-3 rounded-md text-sm">
              {errorMessage}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
            Log In
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/auth/reset")}
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="text-center text-gray-500 text-sm">or</div>

          <button
            type="button"
            onClick={() => router.push("/auth/Register")}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
