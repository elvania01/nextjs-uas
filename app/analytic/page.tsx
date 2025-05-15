'use client';

import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Box,
} from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

type BarChartProps = {
  data: number[];
  labels: string[];
  colors?: string[];
};

function SimpleBarChart({ data, labels, colors }: BarChartProps) {
  const max = Math.max(...data);

  return (
    <div className="grid grid-cols-7 gap-2 mt-4">
      {data.map((value, i) => (
        <div key={i} className="flex flex-col items-center justify-end h-40">
          <span className="text-xs text-gray-600 mb-1">{value}</span>
          <div
            className="w-6 rounded-t-md"
            style={{
              height: `${(value / max) * 100}%`,
              backgroundColor: colors?.[i] || '#ec4899',
            }}
            title={`${labels[i]}: ${value}`}
          ></div>
          <span className="text-xs mt-1">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

type StatCardProps = {
  icon: JSX.Element;
  label: string;
  value: string;
  growth: string;
  negative?: boolean;
};

function StatCard({ icon, label, value, growth, negative }: StatCardProps) {
  return (
    <div className="bg-pink-100 p-4 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow">{icon}</div>
        <div>
          <p className="text-sm font-medium text-pink-800">{label}</p>
          <p className="text-2xl font-bold text-pink-700">{value}</p>
        </div>
      </div>
      <div className="flex items-center text-sm mt-2">
        {negative ? (
          <span className="flex items-center gap-1 text-red-600">
            <TrendingDown size={14} /> {growth}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-green-600">
            <TrendingUp size={14} /> {growth}
          </span>
        )}
      </div>
    </div>
  );
}

type Produk = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
};

type Transaksi = {
  id_transaksi: number;
  produk: Produk;
  nama_pembeli: string;
  tanggal_transaksi: string; // format YYYY-MM-DD
  total_harga: number;
};

export default function Analytic() {
  // Dummy data produk
  const produkList: Produk[] = [
    {
      id: "w1",
      name: "Classic White Roses",
      image: "/images/wedding-white-roses.jpg",
      price: 500,
      description: "Elegant white roses perfect for weddings.",
      category: "wedding",
      stock: 15,
    },
    {
      id: "w2",
      name: "Pastel Romance",
      image: "/images/wedding-pastel.jpg",
      price: 650,
      description: "A pastel-themed bouquet for your dreamy wedding.",
      category: "wedding",
      stock: 15,
    },
    {
      id: "b1",
      name: "Colorful Birthday Bash",
      image: "/images/birthday-colorful.jpg",
      price: 400,
      description: "Celebrate birthdays with vibrant flowers.",
      category: "birthday",
      stock: 15,
    },
    {
      id: "b2",
      name: "Sunflower Surprise",
      image: "/images/birthday-sunflower.jpg",
      price: 450,
      description: "Bright sunflowers to light up the day.",
      category: "birthday",
      stock: 15,
    },
    {
      id: "a1",
      name: "Romantic Reds",
      image: "/images/anniversary-reds.jpg",
      price: 700,
      description: "Red roses to celebrate timeless love.",
      category: "anniversary",
      stock: 15,
    },
    {
      id: "a2",
      name: "Elegant Orchids",
      image: "/images/anniversary-orchids.jpg",
      price: 750,
      description: "Orchids to show your lasting affection.",
      category: "anniversary",
      stock: 15,
    },
    {
      id: "s1",
      name: "Graduation Glory",
      image: "/images/special-graduation.jpg",
      price: 500,
      description: "Celebrate milestones with floral pride.",
      category: "special",
      stock: 15,
    },
    {
      id: "s2",
      name: "New Baby Blooms",
      image: "/images/special-baby.jpg",
      price: 550,
      description: "Soft pastels for joyful beginnings.",
      category: "special",
      stock: 15,
    },
  ];

  // Dummy transaksi yang lebih realistis, mengacu ke produkList
  const transaksiList: Transaksi[] = [
    {
      id_transaksi: 1,
      produk: produkList[0], // Classic White Roses
      nama_pembeli: "Andi",
      tanggal_transaksi: "2025-05-10",
      total_harga: produkList[0].price,
    },
    {
      id_transaksi: 2,
      produk: produkList[5], // Elegant Orchids
      nama_pembeli: "Budi",
      tanggal_transaksi: "2025-05-11",
      total_harga: produkList[5].price,
    },
    {
      id_transaksi: 3,
      produk: produkList[2], // Colorful Birthday Bash
      nama_pembeli: "Citra",
      tanggal_transaksi: "2025-05-12",
      total_harga: produkList[2].price,
    },
    {
      id_transaksi: 4,
      produk: produkList[1], // Pastel Romance
      nama_pembeli: "Dewi",
      tanggal_transaksi: "2025-05-13",
      total_harga: produkList[1].price,
    },
    {
      id_transaksi: 5,
      produk: produkList[4], // Romantic Reds
      nama_pembeli: "Eko",
      tanggal_transaksi: "2025-05-14",
      total_harga: produkList[4].price,
    },
  ];

  // Statistik summary
  const totalProduk = produkList.length;
  const totalTransaksi = transaksiList.length;
  const totalPendapatan = transaksiList.reduce((sum, t) => sum + t.total_harga, 0);
  const totalPengguna = 102; // contoh static
  const avgTransaksi = totalPendapatan / totalTransaksi;

  // Data untuk grafik bar mingguan (dummy)
  const chartData = [50, 75, 30, 90, 60, 40, 80];
  const chartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const chartColors = [
    '#f43f5e',
    '#ec4899',
    '#d946ef',
    '#a855f7',
    '#6366f1',
    '#0ea5e9',
    '#10b981',
  ];

  const [formattedTotalPendapatan, setFormattedTotalPendapatan] = useState('');
  const [formattedAvgTransaksi, setFormattedAvgTransaksi] = useState('');

  useEffect(() => {
    setFormattedTotalPendapatan(
      totalPendapatan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    );
    setFormattedAvgTransaksi(
      avgTransaksi.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    );
  }, [totalPendapatan, avgTransaksi]);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-pink-700">Dashboard Analitik</h1>
          <p className="text-sm text-gray-500">Terakhir diperbarui: 15 Mei 2025</p>
        </div>
        <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow">
          <Download size={16} />
          Unduh Laporan
        </button>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Box className="text-pink-600" />}
          label="Total Produk"
          value={totalProduk.toString()}
          growth="+5%"
        />
        <StatCard
          icon={<ShoppingCart className="text-pink-600" />}
          label="Total Transaksi"
          value={totalTransaksi.toString()}
          growth="+12%"
        />
        <StatCard
          icon={<DollarSign className="text-pink-600" />}
          label="Total Pendapatan"
          value={formattedTotalPendapatan}
          growth="+20%"
        />
        <StatCard
          icon={<Users className="text-pink-600" />}
          label="Total Pengguna"
          value={totalPengguna.toString()}
          growth="-1.2%"
          negative
        />
      </div>

      {/* Ringkasan Tambahan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rata-rata transaksi */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Rata-rata Nilai Transaksi</h2>
          <p className="text-2xl font-bold text-pink-700">{formattedAvgTransaksi}</p>
          <p className="text-sm text-gray-500 mt-1">
            Berdasarkan total pendapatan dan transaksi
          </p>
        </div>

        {/* Profit Mingguan */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Profit Mingguan</h2>
          <p className="text-sm text-gray-500">Periode: Minggu ini</p>

          <div className="flex flex-wrap items-center gap-6 mt-2 mb-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-pink-700">Total Penjualan:</span>{' '}
              {chartData.reduce((a, b) => a + b, 0)}
            </div>
            <div>
              <span className="font-semibold text-pink-700">Hari Terbaik:</span>{' '}
              {chartLabels[chartData.indexOf(Math.max(...chartData))]}
            </div>
            <div>
              <span className="font-semibold text-pink-700">Hari Terendah:</span>{' '}
              {chartLabels[chartData.indexOf(Math.min(...chartData))]}
            </div>
          </div>

          <SimpleBarChart data={chartData} labels={chartLabels} colors={chartColors} />
        </div>
        </div>

  {/* Daftar Produk */}
  <section>
    <h2 className="text-xl font-semibold text-pink-700 mb-4">Daftar Produk</h2>
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-pink-200 text-pink-800">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID Produk</th>
            <th className="border border-gray-300 px-4 py-2">Nama Produk</th>
            <th className="border border-gray-300 px-4 py-2">Harga</th>
          </tr>
        </thead>
        <tbody>
          {produkList.map(({ id, name, price }) => (
            <tr key={id} className="even:bg-pink-50">
              <td className="border border-gray-300 px-4 py-2">{id}</td>
              <td className="border border-gray-300 px-4 py-2">{name}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  {/* Daftar Transaksi */}
  <section>
    <h2 className="text-xl font-semibold text-pink-700 mb-4">Daftar Transaksi</h2>
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-pink-200 text-pink-800">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID Transaksi</th>
            <th className="border border-gray-300 px-4 py-2">Nama Produk</th>
            <th className="border border-gray-300 px-4 py-2">Pembeli</th>
            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {transaksiList.map(({ id_transaksi, produk, nama_pembeli, tanggal_transaksi, total_harga }) => (
            <tr key={id_transaksi} className="even:bg-pink-50">
              <td className="border border-gray-300 px-4 py-2">{id_transaksi}</td>
              <td className="border border-gray-300 px-4 py-2">{produk.name}</td>
              <td className="border border-gray-300 px-4 py-2">{nama_pembeli}</td>
              <td className="border border-gray-300 px-4 py-2">{tanggal_transaksi}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {total_harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</div>
);
}