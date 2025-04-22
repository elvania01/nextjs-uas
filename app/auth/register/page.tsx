"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5"; 

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration successful!");
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      {/* Tombol Kembali */}
      <div className="absolute top-5 left-5">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-200"
        >
          <IoArrowBack className="h-6 w-6" />
        </button>
      </div>

      <div className="text-center absolute top-10">
        <Image
          src="/noona-logo.png"
          alt="Noona Logo"
          width={50}
          height={50}
          className="mx-auto mb-2"
        />
        <div className="text-white font-pacifico font-bold text-2x">Noona Florist</div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-3 w-80 mt-40">
        <h2 className="text-center text-lg font-semibold mt-4 mb-4">
          Registration
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name..."
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email..."
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username..."
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
