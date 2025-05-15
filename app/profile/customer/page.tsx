"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerProfilePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (!isLoggedIn || username === "Noona") {
      router.push("/auth/login"); 
    } else {
      setUsername(username || "Customer");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="min-h-screen bg-[#fff8f9] text-white px-6 py-10 flex items-center justify-center">Customer Profile</h1>
      <div className="bg-pink-200 rounded-xl shadow-md p-6 max-w-sm mx-auto text-center">
        <img
          src="/owner3.jpg"
          alt="Customer"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="italic text-gray-600 mt-2">
          I'm a flower enthusiast who loves shopping from Noona Florist 🌸
        </p>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
