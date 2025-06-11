"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: ""
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userDataStr = localStorage.getItem("user");

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    if (userDataStr) {
      try {
        const user = JSON.parse(userDataStr);
        setUserData({
          name: user.name || "Customer",
          email: user.email || "",
          username: user.username || ""
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        const username = localStorage.getItem("username");
        setUserData({
          name: username || "Customer",
          email: "",
          username: username || ""
        });
      }
    } else {
      const username = localStorage.getItem("username");
      setUserData({
        name: username || "Customer",
        email: "",
        username: username || ""
      });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fff8f9] p-4">
      <h1 className="text-pink-600 text-2xl font-bold text-center py-6">Customer Profile</h1>
      
      <div className="bg-pink-100 rounded-xl shadow-md p-6 max-w-sm mx-auto text-center">
        <img
          src="/team/owner3.jpg"
          alt="Customer"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-pink-300"
        />
        <h2 className="text-xl font-semibold text-pink-700">{userData.name}</h2>
        <p className="text-gray-600 mt-1">@{userData.username}</p>
        {userData.email && (
          <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
        )}
        <p className="italic text-gray-600 mt-4">
          I'm a flower enthusiast who loves shopping from Noona Florist 🌸
        </p>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
