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

type Produk = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description?: string | null;
  category?: string | null;
  stock?: number | null;
};

type Transaksi = {
  id_transaksi: number;
  produk: Produk;
  nama_pembeli: string;
  tanggal_transaksi: Date;
  total_harga: number;
};

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
          />
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

type Props = {
  produkList: Produk[];
  transaksiList: Transaksi[];
};

export default function AnalyticClient({ produkList, transaksiList }: Props) {
  const [loading, setLoading] = useState(true);

  const totalProduk = produkList.length;
  const totalTransaksi = transaksiList.length;
  const totalPendapatan = transaksiList.reduce((sum, t) => sum + t.total_harga, 0);
  const totalPengguna = 102;
  const avgTransaksi = totalPendapatan / (totalTransaksi || 1);

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

    const timer = setTimeout(() => setLoading(false), 1200); // Simulasi delay

    return () => clearTimeout(timer);
  }, [totalPendapatan, avgTransaksi]);

  if (loading) {
  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 w-40 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 w-32 rounded animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-pink-200 rounded-xl animate-pulse" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-pink-100 rounded-xl shadow animate-pulse space-y-4 h-28"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full" />
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-20 h-6 bg-gray-300 rounded" />
              </div>
            </div>
            <div className="w-16 h-3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Detail Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Avg Transaksi */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 animate-pulse">
          <div className="w-48 h-4 bg-gray-300 rounded" />
          <div className="w-32 h-6 bg-pink-200 rounded" />
          <div className="w-40 h-3 bg-gray-200 rounded" />
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4 animate-pulse">
          <div className="w-48 h-4 bg-gray-300 rounded" />
          <div className="w-32 h-3 bg-gray-200 rounded" />
          <div className="flex flex-wrap gap-4 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-32 h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-40">
                <div className="w-6 h-4 mb-1 bg-gray-300 rounded" />
                <div className="w-6 bg-gray-300 rounded" style={{ height: `${20 + i * 5}px` }} />
                <div className="w-6 h-3 mt-1 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-pink-700">Dashboard Analitik</h1>
          <p className="text-sm text-gray-500">Terakhir diperbarui: 16 Mei 2025</p>
        </div>
        <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow">
          <Download size={16} />
          Unduh Laporan
        </button>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Rata-rata Nilai Transaksi</h2>
          <p className="text-2xl font-bold text-pink-700">{formattedAvgTransaksi}</p>
          <p className="text-sm text-gray-500 mt-1">
            Berdasarkan total pendapatan dan transaksi
          </p>
        </div>

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
    </div>
  );
}
