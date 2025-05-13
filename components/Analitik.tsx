'use client';

export default function Analitik() {
  const totalProduk = 12;
  const totalTransaksi = 30;
  const totalPendapatan = 750000;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-pink-100 p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium text-pink-800">Total Produk</h3>
        <p className="text-2xl font-bold text-pink-700">{totalProduk}</p>
      </div>
      <div className="bg-pink-100 p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium text-pink-800">Total Transaksi</h3>
        <p className="text-2xl font-bold text-pink-700">{totalTransaksi}</p>
      </div>
      <div className="bg-pink-100 p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium text-pink-800">Total Pendapatan</h3>
        <p className="text-2xl font-bold text-pink-700">Rp {totalPendapatan.toLocaleString()}</p>
      </div>
    </div>
  );
}
