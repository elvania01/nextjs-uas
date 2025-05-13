'use client';

const produkDummy = [
  { id: 1, nama: 'Buket Mawar', harga: 150000, stok: 10 },
  { id: 2, nama: 'Bunga Ulang Tahun', harga: 200000, stok: 5 },
  { id: 3, nama: 'Dekorasi Wedding', harga: 500000, stok: 2 },
];

export default function ProdukTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-pink-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Nama Produk</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Harga</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Stok</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {produkDummy.map((produk) => (
            <tr key={produk.id}>
              <td className="px-6 py-4 whitespace-nowrap">{produk.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{produk.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap">Rp {produk.harga.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{produk.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
