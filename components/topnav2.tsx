"use client";

import Link from "next/link";
import { FaBox, FaUsers, FaMoneyCheckAlt } from "react-icons/fa";

export default function TopNav2() {
  return (
    <div className="py-6 px-4 flex justify-center bg-white shadow-md rounded-b-xl">
      <nav className="flex flex-wrap gap-4 justify-center">
        <NavButton href="/admin/products" icon={<FaBox />} label="Products" />
        <NavButton href="/admin/customers" icon={<FaUsers />} label="Customers" />
        <NavButton href="/admin/transactions" icon={<FaMoneyCheckAlt />} label="Transactions" />
      </nav>
    </div>
  );
}

type NavButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

function NavButton({ href, icon, label }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <span className="text-md">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
